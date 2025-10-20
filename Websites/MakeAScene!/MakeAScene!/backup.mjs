import axios from 'axios';
import fs from 'fs';
import readline from 'readline';

// Hugging Face API Setup
const API_KEY = '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';
const MODEL = 'gpt2'; // Change this to a preferred Hugging Face model if needed

// Hugging Face Text Generation
async function generateText(prompt) {
  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      { inputs: prompt },
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    );
    return response.data[0].generated_text;
  } catch (error) {
    console.error("Error calling Hugging Face API:", error.message || error);
    return "Unable to generate text at this time.";
  }
}

/* 

const API_KEY = "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"; // Replace with your actual API key
const MODEL = "Qwen/Qwen2.5-1.5B-Instruct"; // Model name

async function generateText(prompt) {
    try {
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${MODEL}`,
            { inputs: prompt },
            {
                headers: { Authorization: `Bearer ${API_KEY}` },
            }
        );
        return response.data.generated_text || response.data[0]?.generated_text;
    } catch (error) {
        console.error("Error generating text:", error.message || error);
        return "An error occurred while generating text.";
    }
}
*/
// Load Genre JSON
function loadGenreData(genre) {
  try {
    const filePath = `./data/${genre}.json`; // File path should not have the "horror" root key
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data;
  } catch (error) {
    console.error(`Error loading genre data for "${genre}":`, error.message);
    return null;
  }
}


async function generateStorySegment(prompt) {
  try {
    return await generateText(prompt);
  } catch (error) {
    console.error("Error generating story segment:", error);
    return "An error occurred while generating the story segment.";
  }
}

function containsBadContent(text, badExamples) {
  return badExamples.some((example) =>
    typeof example === 'string' ? text.includes(example) : example.some((line) => text.includes(line))
  );
}




const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}
; // Import for random selections

// Default fallback options
const defaultOptions = {
  pacing: ['fast-paced', 'slow-paced'],
  tone: ['dark', 'comedic', 'mysterious', 'serious'],
  characterArchetypes: {
    hero: 'A brave and determined protagonist',
    antihero: 'A morally ambiguous central figure',
    mentor: 'A wise and guiding figure'
  },
  villainArchetypes: {
    overlord: 'A powerful antagonist seeking control',
    trickster: 'A cunning and deceptive villain',
    beast: 'A relentless, monstrous foe'
  },
  settings: ['a haunted forest', 'a bustling city', 'a desolate wasteland'],
  dialogues: {
    dialogue1: "We shouldn't be here.",
    dialogue2: "I've been waiting for you.",
    dialogue3: "This place gives me the creeps."
  }
};

function getRandomChoice(options) {
  const keys = Object.keys(options);
  return keys[randomInt(keys.length)];
}

function getRandomArrayChoice(options) {
  return options[randomInt(options.length)];
}

let story = "";



async function main() {
  console.log("Welcome to MakeAScene!\n");

  const genre = await askQuestion("Choose a genre (e.g., horror, fantasy, action): ");
  const genreData = loadGenreData(genre.trim().toLowerCase());

  

  // Use default values if genre data is missing or incomplete
  const characterOptions = genreData?.characterArc || defaultOptions.characterArchetypes;
  const villainOptions = genreData?.villains || defaultOptions.villainArchetypes;
  const settingOptions = genreData?.settings || defaultOptions.settings;
  const dialogueOptions = genreData?.dialogue || defaultOptions.dialogues;

  let pacing = await askQuestion("Do you prefer a fast-paced or slow-paced story? ");
  pacing = pacing.trim() || getRandomArrayChoice(defaultOptions.pacing);

  let tone = await askQuestion("What tone do you want for your story (e.g., dark, comedic, mysterious): ");
  tone = tone.trim() || getRandomArrayChoice(defaultOptions.tone);

  console.log("\nCharacter Archetypes:");
  Object.keys(characterOptions).forEach((key) => console.log(`- ${key}: ${characterOptions[key].split(".")[0]}`));
  let characterChoice = await askQuestion("Choose a character archetype: ");
  characterChoice = characterChoice.trim() || getRandomChoice(characterOptions);

  console.log("\nVillain Archetypes:");
  Object.keys(villainOptions).forEach((key) => console.log(`- ${key}: ${villainOptions[key]}`));
  let villainChoice = await askQuestion("Choose a villain archetype: ");
  villainChoice = villainChoice.trim() || getRandomChoice(villainOptions);

  // Display Settings
  console.log("\nSettings:");
  Object.values(genreData.settings).forEach((setting) => console.log(`- ${setting}`));
  const settingChoice = await askQuestion("Choose a setting: ");

  console.log("\nDialogue Samples:");
  Object.entries(dialogueOptions).forEach(([key, dialogue], idx) =>
    console.log(`Dialogue ${idx + 1}: ${dialogue.split(".")[0]}...`)
  );
  
  // Prompt for dialogue choice or generate random dialogue
  let dialogueChoice = await askQuestion("Choose a dialogue (e.g., dialogue1), or leave blank to generate random or provide your own: ");
  dialogueChoice = dialogueChoice.trim() || getRandomChoice(dialogueOptions);
  
  // If the user didn’t choose one, ask them to provide custom dialogue
  if (!dialogueOptions[dialogueChoice]) {
    console.log("\nNo valid dialogue selected. Please provide your own dialogue for the scene:");
    dialogueChoice = await askQuestion("Enter your custom dialogue: ");
    // You can process or validate the custom dialogue here if needed
  } else {
    console.log(`You selected: ${dialogueChoice}`);
    console.log(`Dialogue: ${dialogueOptions[dialogueChoice]}`);
  }
  
  // Helper function to get a random choice from dialogue options
  function getRandomChoice(options) {
    const keys = Object.keys(options);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return randomKey;
  }

  
// Function to generate story segments with context
async function generateStorySegmentWithContext(prompt) {
  const fullPrompt = story + "\n" + prompt;  // Include the whole story context in the prompt
  return await generateText(fullPrompt);   // Call the Hugging Face API with the updated context
}
// Generate Inciting Incident
const incitingIncidentPrompt = `This is a quick check before creating the story.  The ${characterChoice} encounters a situation in the ${settingChoice} that sets the story in motion. The tone should be ${tone}.
It can be a small introduction before the intro.

Constraints:
    
    Tone: The story should maintain a ${tone} tone throughout.
    Pacing: The scene should be ${pacing}.
    Setting: Ensure that the environment of the ${settingChoice} is integrated into the scene.
    Character: The ${characterChoice} should act in a way that reflects their role and personality.
    
    ### How It Works:
    - **Good Dialogue**: Shows how characters' personalities influence their reactions. There's natural back-and-forth that feels grounded in reality.
    - **Good Writing**: Focuses on vivid, sensory-rich descriptions without relying on clichés or overly dramatic phrases. It helps set the atmosphere while maintaining subtlety.
    - **Avoiding Bad Dialogue**: Focuses on avoiding repetitive, flat, or overly simplistic exchanges. Instead, the goal is to make characters' dialogue more dynamic and contextually grounded.
    - **Avoiding Bad Writing**: Avoids forced exposition or predictable phrasing. Writing should be more immersive and avoid clichés.
  `;
const incitingIncident = await generateStorySegmentWithContext(incitingIncidentPrompt);
console.log("\nInciting Incident:");
console.log(incitingIncident);

const incitingIncidentFeedback = await askQuestion("Do you want to modify the inciting incident? (y/n): ");
if (incitingIncidentFeedback.toLowerCase() === 'y') {
  const newIncident = await askQuestion("Enter your new inciting incident: ");
  story += newIncident + "\n";
} else {
  story += incitingIncident + "\n";
}

// Generate Introduction
const introPrompt = `Write an introduction for the story. The ${characterChoice} enters the ${settingChoice}. The tone should be ${tone}.`;
const intro = await generateStorySegmentWithContext(introPrompt);
console.log("\nIntroduction:");
console.log(intro);
const introFeedback = await askQuestion("Do you want to modify the introduction? (y/n): ");
if (introFeedback.toLowerCase() === 'y') {
  const newIntro = await askQuestion("Enter your new introduction: ");
  story += newIntro + "\n";
} else {
  story += intro + "\n";
}

// Generate Rising Action
const risingActionPrompt = `Write the rising action for the story. The ${characterChoice} must face a challenge in the ${settingChoice}.`;
const risingAction = await generateStorySegmentWithContext(risingActionPrompt);
console.log("\nRising Action:");
console.log(risingAction);
const risingActionFeedback = await askQuestion("Do you want to modify the rising action? (y/n): ");
if (risingActionFeedback.toLowerCase() === 'y') {
  const newRisingAction = await askQuestion("Enter your new rising action: ");
  story += newRisingAction + "\n";
} else {
  story += risingAction + "\n";
}

// Generate Climax
const climaxPrompt = `Write the climax of the story. The ${characterChoice} faces the antagonist in the ${settingChoice}. This is the turning point.`;
const climax = await generateStorySegmentWithContext(climaxPrompt);
console.log("\nClimax:");
console.log(climax);
const climaxFeedback = await askQuestion("Do you want to modify the climax? (y/n): ");
if (climaxFeedback.toLowerCase() === 'y') {
  const newClimax = await askQuestion("Enter your new climax: ");
  story += newClimax + "\n";
} else {
  story += climax + "\n";
}

// Generate Falling Action
const fallingActionPrompt = `Write the falling action of the story. The consequences of the climax unfold, and the ${characterChoice} deals with the aftermath in the ${settingChoice}.`;
const fallingAction = await generateStorySegmentWithContext(fallingActionPrompt);
console.log("\nFalling Action:");
console.log(fallingAction);
const fallingActionFeedback = await askQuestion("Do you want to modify the falling action? (y/n): ");
if (fallingActionFeedback.toLowerCase() === 'y') {
  const newFallingAction = await askQuestion("Enter your new falling action: ");
  story += newFallingAction + "\n";
} else {
  story += fallingAction + "\n";
}

// Generate Conclusion
const conclusionPrompt = `Write the conclusion of the story. The ${characterChoice} overcomes the antagonist or escapes. The conflict should resolve here.`;
const conclusion = await generateStorySegmentWithContext(conclusionPrompt);
console.log("\nConclusion:");
console.log(conclusion);
const conclusionFeedback = await askQuestion("Do you want to modify the conclusion? (y/n): ");
if (conclusionFeedback.toLowerCase() === 'y') {
  const newConclusion = await askQuestion("Enter your new conclusion: ");
  story += newConclusion + "\n";
} else {
  story += conclusion + "\n";
}

rl.close();
}

main();