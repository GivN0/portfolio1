import axios from 'axios';
import fs from 'fs';
import readline from 'readline';
import { randomInt } from 'crypto';

const API_KEY = "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";
const MODEL = "gpt-4o-mini";

// Move readline creation and askQuestion function outside of main
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Promisify readline question
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function generateText(prompt) {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: MODEL,
                messages: [
                    { role: "system", content: "You are a creative writing assistant helping to generate a story." },
                    { role: "user", content: prompt }
                ],
                max_tokens: 500,
                temperature: 0.7,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error generating text:", error.response ? error.response.data : error.message);
        return "An error occurred while generating text.";
    }
}

// Load Genre JSON
function loadGenreData(genre) {
  try {
    const filePath = `./data/${genre}.json`;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data;
  } catch (error) {
    console.error(`Error loading genre data for "${genre}":`, error.message);
    return null;
  }
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

async function main() {
  console.log("Welcome to MakeAScene!\n");

  global.paragraphCount = parseInt(await askQuestion("How many paragraphs would you like for each section? (1-5): ")) || 2;
  global.paragraphCount = Math.min(Math.max(global.paragraphCount, 1), 5);

  // Add Character Description Input
  console.log("\nLet's describe your character in detail:");
  
  // Basic Information
  const characterName = await askQuestion("What is your character's name? ");
  const characterAge = await askQuestion("How old is your character? ");
  
  // Physical Description
  console.log("\nPhysical Description:");
  const height = await askQuestion("How tall is your character? (e.g., tall, short, 6'2\"): ");
  const build = await askQuestion("What's their build? (e.g., muscular, slim, stocky): ");
  const hairColor = await askQuestion("What's their hair color and style? ");
  const eyeColor = await askQuestion("What color are their eyes? ");
  const distinguishingFeatures = await askQuestion("Any distinguishing features? (e.g., scars, tattoos, birthmarks): ");
  
  // Personality & Background
  console.log("\nPersonality & Background:");
  const characterPersonality = await askQuestion("Describe your character's personality traits: ");
  const mannerisms = await askQuestion("Any specific mannerisms or habits? (e.g., fidgets, speaks slowly, gestures a lot): ");
  const speechPattern = await askQuestion("How does your character typically speak? (e.g., formal, casual, uses slang): ");
  const background = await askQuestion("What's their background/origin story? ");
  const fears = await askQuestion("What are their fears or weaknesses? ");
  const goals = await askQuestion("What are their main goals or desires? ");
  const values = await askQuestion("What principles or values do they hold dear? ");
  
  // Save the enhanced character data
  const characterData = {
      name: characterName,
      age: characterAge,
      height: height,
      build: build,
      hairColor: hairColor,
      eyeColor: eyeColor,
      distinguishingFeatures: distinguishingFeatures,
      personality: characterPersonality,
      mannerisms: mannerisms,
      speechPattern: speechPattern,
      background: background,
      fears: fears,
      goals: goals,
      values: values
  };

  // Save character data
  saveCharacterData(characterData);

  const genre = await askQuestion("Choose a genre (e.g., horror, fantasy, action): ");
  const genreData = loadGenreData(genre.trim().toLowerCase());

  // Use default values if genre data is missing or incomplete
  const characterOptions = genreData?.characterArc || defaultOptions.characterArchetypes;
  const villainOptions = genreData?.villains || defaultOptions.villainArchetypes;
  const settingOptions = genreData?.settings || defaultOptions.settings;
  const dialogueOptions = genreData?.dialogue || defaultOptions.dialogues;

  console.log("\nCharacter Archetypes:");
  Object.keys(characterOptions).forEach((key) => console.log(`- ${key}: ${characterOptions[key].split(".")[0]}`));
  let characterArchetype = await askQuestion("Choose a character archetype: ");
  characterArchetype = characterArchetype.trim() || getRandomChoice(characterOptions);

  let pacing = await askQuestion("Do you prefer a fast-paced or slow-paced story? ");
  pacing = pacing.trim() || getRandomArrayChoice(defaultOptions.pacing);

  let tone = await askQuestion("What tone do you want for your story (e.g., dark, comedic, mysterious): ");
  tone = tone.trim() || getRandomArrayChoice(defaultOptions.tone);

  // Display Settings
  console.log("\nSettings:");
  Object.values(genreData.settings).forEach((setting) => console.log(`- ${setting}`));
  const settingChoice = await askQuestion("Choose a setting: ");

  console.log("\nVillain Archetypes:");
  Object.keys(villainOptions).forEach((key) => console.log(`- ${key}: ${villainOptions[key]}`));
  let villainChoice = await askQuestion("Choose a villain archetype: ");
  villainChoice = villainChoice.trim() || getRandomChoice(villainOptions);

  // Story Generation
  let story = "";

  // Function to generate story segments with context
  async function generateStorySegmentWithContext(prompt, additionalContext = "") {
    const characterContext = `Character Description:
    - Name: ${characterName}
    - Age: ${characterAge}
    - Height: ${height}
    - Build: ${build}
    - Hair: ${hairColor}
    - Eyes: ${eyeColor}
    - Distinguishing Features: ${distinguishingFeatures}
    - Personality: ${characterPersonality}
    - Archetype: ${characterArchetype}

    `;
    const fullPrompt = characterContext + additionalContext + "\n" + prompt;
    return await generateText(fullPrompt);
  }

  // Function to loop through sections and handle user input
  async function loopThroughSections() {
    const sections = ['Inciting Incident', 'Introduction', 'Rising Action', 'Climax', 'Falling Action', 'Conclusion'];

    for (let section of sections) {
      console.log(`\nGenerating ${section}...`);

      // Generate the current section
      const sectionPrompt = generateSectionPrompt(section);
      const sectionContent = await generateStorySegmentWithContext(sectionPrompt, story);
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
        story += `[Suggestion for next section: ${nextSectionSuggestion}]\n`;
      } else if (userAction === '4') {
        story += sectionContent + "\n";
      }
    }

    // Save the final story
    fs.writeFileSync('generated_story.txt', story, 'utf-8');
    console.log("\nStory has been saved to generated_story.txt");
    rl.close();
  }

  // Helper function to generate section-specific prompts
  function generateSectionPrompt(section) {
    const characterDescription = `${characterName}, a ${characterAge}-year-old ${characterPersonality} ${characterArchetype}`;
    const promptMap = {
      'Inciting Incident': `Write an inciting incident where ${characterDescription} encounters a challenge in ${settingChoice}. The tone should be ${tone}.`,
      'Introduction': `Introduce ${characterDescription} as they enter ${settingChoice}. Capture their ${characterPersonality} nature.`,
      'Rising Action': `Develop the rising action where ${characterDescription} must overcome a challenge in ${settingChoice}.`,
      'Climax': `Create the climax where ${characterDescription} confronts the ${villainChoice} in ${settingChoice}.`,
      'Falling Action': `Write the falling action showing how ${characterDescription} processes the events in ${settingChoice}.`,
      'Conclusion': `Conclude the story, showing how the experience has impacted ${characterDescription} in ${settingChoice}.`
    };
    return promptMap[section] || "Write the next part of the story.";
  }

  // Start the story generation process
  await loopThroughSections();
}

function saveCharacterData(characterData) {
    try {
        let charactersFile = 'data/characters.json';
        let characters = { characters: [] };

        // Load existing characters if file exists
        if (fs.existsSync(charactersFile)) {
            characters = JSON.parse(fs.readFileSync(charactersFile, 'utf-8'));
        }

        // Add new character with enhanced data
        characters.characters.push({
            name: characterData.name,
            age: characterData.age,
            appearance: `${characterData.height}, ${characterData.build}, with ${characterData.hairColor} hair and ${characterData.eyeColor} eyes. ${characterData.distinguishingFeatures}`,
            personality: characterData.personality,
            mannerisms: characterData.mannerisms,
            speechPattern: characterData.speechPattern,
            background: characterData.background,
            fears: characterData.fears,
            goals: characterData.goals,
            values: characterData.values
        });

        // Save updated characters file
        fs.writeFileSync(charactersFile, JSON.stringify(characters, null, 2));
        console.log("\nCharacter data saved successfully!");

    } catch (error) {
        console.error("Error saving character data:", error);
    }
}

main().catch(err => {
  console.error(err);
  rl.close();
});