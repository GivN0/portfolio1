import axios from "axios"; // Import axios for HTTP requests

// OpenAI API Setup
const API_KEY = "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";
const MODEL = "gpt-4o-mini"; // Use the preferred OpenAI model (e.g., gpt-3.5-turbo, gpt-4)

// Function to Generate Text using OpenAI API
async function generateText(prompt) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions", // OpenAI Chat Completions endpoint
      {
        model: MODEL,
        messages: [
          { role: "system", content: "You are a helpful assistant." }, // System instruction
          { role: "user", content: prompt }, // User's prompt
        ],
        max_tokens: 100, // Adjust token limit
        temperature: 0.7, // Adjust temperature for creativity
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    // Extract and return the generated text
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating text:", error.message || error);
    return "An error occurred while generating text.";
  }
}

// Example Usage
const userPrompt = "Write a short story about a brave knight and a dragon.";
generateText(userPrompt).then((result) => {
  console.log("Response from ChatGPT:", result);
});
