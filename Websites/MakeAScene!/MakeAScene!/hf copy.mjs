import axios from 'axios';
import fs from 'fs';
import readline from 'readline';
import { randomInt } from 'crypto'

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

// Function to loop through sections and handle user input
async function loopThroughSections() {
  const sections = ['Inciting Incident', 'Introduction', 'Rising Action', 'Climax', 'Falling Action', 'Conclusion'];

  for (let section of sections) {
    console.log(`\nGenerating ${section}...`);

    // Generate the current section
    const sectionPrompt = generateSectionPrompt(section);
    const sectionContent = await generateStorySegmentWithContext(sectionPrompt);
    console.log(`\n${section}:`);
    console.log(sectionContent);

    // Give user options to modify the section
    let userAction = await askQuestion("\nWhat would you like to do?\n1. Suggest an addition to this section\n2. Write your own version\n3. Suggest something to be added to the next section\n4. Continue to next section\nEnter choice (1/2/3/4): ");

    if (userAction === '1') {
      const addition = await askQuestion("Enter your suggestion for addition: ");
      story += addition + "\n";
    } else if (userAction === '2') {
      const userSection = await askQuestion("Enter your version of this section: ");
      story += userSection + "\n";
    } else if (userAction === '3') {
      const nextSectionSuggestion = await askQuestion("What would you like to add to the next section? ");
      await suggestForNextSection(nextSectionSuggestion);
    } else if (userAction === '4') {
      story += sectionContent + "\n";
    }
  }

  rl.close();
}

// Helper function to generate section-specific prompts
function generateSectionPrompt(section) {
  const promptMap = {
    'Inciting Incident': `Write an inciting incident where the character faces a challenge in a ${settingChoice} setting.`,
    'Introduction': `Write an introduction where the ${characterChoice} enters the ${settingChoice}.`,
    'Rising Action': `Write the rising action where the ${characterChoice} must face a challenge in the ${settingChoice}.`,
    'Climax': `Write the climax where the ${characterChoice} faces the antagonist in the ${settingChoice}.`,
    'Falling Action': `Write the falling action where the ${characterChoice} deals with the aftermath of the climax in the ${settingChoice}.`,
    'Conclusion': `Write the conclusion where the ${characterChoice} resolves the conflict and the story concludes in the ${settingChoice}.`
  };
  return promptMap[section] || "Write the next part of the story.";
}

// Function to store the suggestion for the next section
async function suggestForNextSection(suggestion) {
  console.log("\nSuggestion for the next section received: " + suggestion);
}

// Function to generate story segments with context
async function generateStorySegmentWithContext(prompt) {
  const fullPrompt = story + "\n" + prompt;
  return await generateText(fullPrompt);
}

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
// Convert settings object to an array of values
const availableSettings = genreData?.settings 
  ? Object.values(genreData.settings) 
  : defaultOptions.settings;

// Use a standard for...of loop to display settings
for (const setting of availableSettings) {
  console.log(`- ${setting}`);
}

// Get settingChoice BEFORE using it in prompts
let settingChoice = await askQuestion("Choose a setting: ");
// If no setting is chosen, pick a random one
settingChoice = settingChoice.trim() || getRandomArrayChoice(availableSettings);

  console.log("\nDialogue Samples:");
  Object.entries(dialogueOptions).forEach(([key, dialogue], idx) =>
    console.log(`Dialogue ${idx + 1}: ${dialogue.split(".")[0]}...`)
  );
  
  // Prompt for dialogue choice or generate random dialogue
  let dialogueChoice = await askQuestion("Choose a dialogue (e.g., dialogue1), or leave blank to generate random or provide your own: ");
  dialogueChoice = dialogueChoice.trim() || getRandomChoice(dialogueOptions);
  
  // If the user didn't choose one, ask them to provide custom dialogue
  if (!dialogueOptions[dialogueChoice]) {
    console.log("\nNo valid dialogue selected. Please provide your own dialogue for the scene:");
    dialogueChoice = await askQuestion("Enter your custom dialogue: ");
  } else {
    console.log(`You selected: ${dialogueChoice}`);
    console.log(`Dialogue: ${dialogueOptions[dialogueChoice]}`);
  }

  // Generate Inciting Incident
  const incitingIncidentPrompt = `This is a quick check before creating the story. The ${characterChoice} encounters a situation in the ${settingChoice} that sets the story in motion. The tone should be ${tone}.
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

// Only log the AI's response, not the prompt
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

// Only log the AI's response, not the prompt
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

// Only log the AI's response, not the prompt
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

// Only log the AI's response, not the prompt
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

// Only log the AI's response, not the prompt
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

main().catch(console.error);