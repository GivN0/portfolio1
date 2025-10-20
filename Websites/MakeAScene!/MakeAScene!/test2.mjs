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
// Generate Story Segments with Awareness of Bad Content
async function generateStorySegmentWithAwareness(prompt, badDialogue, badWriting) {
  // Append the bad dialogue and writing examples to the prompt
  const badDialogueExamples = badDialogue.map((d) => `- ${d}`).join("\n");
  const badWritingExamples = badWriting.map((w) => `- ${w}`).join("\n");

  const fullPrompt = `
    ${prompt}
    
    The following are examples of bad writing and dialogue. Do NOT include anything similar to these:
    Bad Dialogue:
    ${badDialogueExamples}
    
    Bad Writing:
    ${badWritingExamples}
    
    Please generate text that avoids these problems.
  `;

  // Generate text using the full prompt
  return await generateText(fullPrompt);
}

// Filter for Bad Writing or Dialogue
function containsBadContent(text, badExamples) {
  for (const example of badExamples) {
    if (typeof example === 'string' && text.includes(example)) {
      return true;
    } else if (Array.isArray(example)) {
      for (const line of example) {
        if (text.includes(line)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Generate Story Segments
async function generateStorySegment(prompt) {
  return await generateText(prompt);
}


// Readline Interface Setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

// Main Functionality
async function main() {
  console.log("Welcome to MakeAScene! Let's create your story.\n");

  const genre = await askQuestion("Choose a genre (e.g., horror, fantasy, action): ");
  const genreData = loadGenreData(genre.trim().toLowerCase());

  if (!genreData) {
    console.error("Could not load genre data. Ensure the file exists and is properly formatted.");
    rl.close();
    return;
  }

  if (!genreData.characterArc || !genreData.badDialogue || !genreData.badWriting) {
    console.error("Error: Required keys missing in the JSON data.");
    rl.close();
    return;
  }

  // Display Character Choices
  console.log("\nCharacter Archetypes:");
  Object.keys(genreData.characterArc).forEach((key) =>
    console.log(`- ${key}: ${genreData.characterArc[key].split(".")[0]}...`)
  );
  const characterChoice = await askQuestion("Choose a character archetype: ");

  // Display Settings
  console.log("\nSettings:");
  Object.values(genreData.settings).forEach((setting) => console.log(`- ${setting}`));
  const settingChoice = await askQuestion("Choose a setting: ");

  // Display Dialogue Samples
  console.log("\nDialogue Samples:");
  Object.values(genreData.dialogue).forEach((dialogue, idx) =>
    console.log(`Dialogue ${idx + 1}: ${dialogue.split(".")[0]}...`)
  );
  const dialogueChoice = await askQuestion("Choose a dialogue (e.g., dialogue1): ");

  let story = "";

  async function createAndFilterSegment(prompt) {
    const generatedSegment = await generateText(prompt);
    console.log("\nGenerated Segment:");
    console.log(generatedSegment);

    // Check for bad content
    if (
      containsBadContent(generatedSegment, genreData.badDialogue) ||
      containsBadContent(generatedSegment, genreData.badWriting)
    ) {
      console.log("\n⚠️ Warning: The segment contains elements of bad dialogue or bad writing.");
      const userFeedback = await askQuestion("Do you want to revise it? (y/n): ");
      if (userFeedback.toLowerCase() === 'y') {
        const revisedSegment = await askQuestion("Enter your revised segment: ");
        return revisedSegment;
      }
    }
    return generatedSegment;
  }


// Generate Introduction
const introPrompt = `Write an introduction for a horror story featuring a ${characterChoice} in a ${settingChoice}. The story should start with tension and introduce a conflict.`;

const intro = await generateStorySegmentWithAwareness(
  introPrompt,
  Object.values(genreData.badDialogue).flat(),
  Object.values(genreData.badWriting).flat()
);

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
  const risingAction = await generateStorySegment(risingActionPrompt);
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
  const climax = await generateStorySegment(climaxPrompt);
  console.log("\nClimax:");
  console.log(climax);
  const climaxFeedback = await askQuestion("Do you want to modify the climax? (y/n): ");
  if (climaxFeedback.toLowerCase() === 'y') {
    const newClimax = await askQuestion("Enter your new climax: ");
    story += newClimax + "\n";
  } else {
    story += climax + "\n";
  }

  // Generate Conclusion
  const conclusionPrompt = `Write the conclusion of the story. The ${characterChoice} overcomes the antagonist or escapes. The conflict should resolve here.`;
  const conclusion = await generateStorySegment(conclusionPrompt);
  console.log("\nConclusion:");
  console.log(conclusion);
  const conclusionFeedback = await askQuestion("Do you want to modify the conclusion? (y/n): ");
  if (conclusionFeedback.toLowerCase() === 'y') {
    const newConclusion = await askQuestion("Enter your new conclusion: ");
    story += newConclusion + "\n";
  } else {
    story += conclusion + "\n";
  }

  async function suggestImprovements(userInput) {
    const improvementPrompt = `The user has rewritten part of a story. Suggest ways to improve it for better pacing, tone, and coherence:\n\n${userInput}`;
    return await generateText(improvementPrompt);
  }

  const plotValidationPrompt = `
  Here's the story so far:
  ${story}
  Does the story flow logically? Suggest adjustments for better coherence.
`;
const feedback = await generateText(plotValidationPrompt);
console.log("AI Plot Feedback:", feedback);

function saveProgress(story) {
  fs.writeFileSync('story_progress.txt', story, 'utf8');
}
const toneChoice = await askQuestion("What tone do you want for your story (e.g., dark, comedic, mysterious): ");
const pacingChoice = await askQuestion("Do you prefer a fast-paced or slow-paced story? ");


  // Final Story
  console.log("\nYour Complete Story:\n");
  console.log(story);

  rl.close();
}

main();