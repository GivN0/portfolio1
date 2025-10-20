import fs from 'fs';
import readline from 'readline';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Check if API key exists
if (!process.env.OPENAI_API_KEY) {
    console.error("Error: OPENAI_API_KEY not found in environment variables");
    console.log("Please make sure you have a .env file with your OpenAI API key");
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

async function generateResponse(prompt) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 150
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Error generating response:", error);
        return "I apologize, but I'm having trouble responding right now.";
    }
}

async function main() {
    try {
        console.log("Starting character talk system...");
        
        // Load characters
        const charactersPath = 'data/characters.json';
        if (!fs.existsSync(charactersPath)) {
            console.error("Error: characters.json file not found!");
            return;
        }

        const charactersData = JSON.parse(fs.readFileSync(charactersPath, 'utf-8'));
        
        if (!charactersData.characters || charactersData.characters.length === 0) {
            console.log("No characters found. Please create a character first using the main program.");
            return;
        }

        // Enhanced character display
        console.log("\nAvailable characters:");
        charactersData.characters.forEach((char, index) => {
            console.log(`\n${index + 1}. ${char.name}`);
            console.log("   ----------------------------------------");
            // Display all available character information
            Object.entries(char).forEach(([key, value]) => {
                if (value && value !== "undefined") {
                    console.log(`   ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`);
                }
            });
            console.log("   ----------------------------------------");
        });

        // Select character
        const selection = parseInt(await askQuestion("\nSelect a character number: ")) - 1;
        if (selection < 0 || selection >= charactersData.characters.length) {
            console.log("Invalid selection.");
            return;
        }

        const selectedCharacter = charactersData.characters[selection];
        console.log(`\nNow talking with ${selectedCharacter.name}. Type 'exit' to end conversation.`);

        let conversationHistory = [];
        
        // Enhanced character context for more detailed responses
        const characterContext = `You are ${selectedCharacter.name}, a ${selectedCharacter.age}-year-old character with the following traits:

Physical Appearance:
- ${selectedCharacter.appearance}

Personality & Behavior:
- Personality: ${selectedCharacter.personality}
${selectedCharacter.mannerisms ? `- Mannerisms: ${selectedCharacter.mannerisms}` : ''}
${selectedCharacter.speechPattern ? `- Speech Pattern: ${selectedCharacter.speechPattern}` : ''}

Background & Motivations:
${selectedCharacter.background ? `- Background: ${selectedCharacter.background}` : ''}
${selectedCharacter.fears ? `- Fears/Weaknesses: ${selectedCharacter.fears}` : ''}
${selectedCharacter.goals ? `- Goals/Desires: ${selectedCharacter.goals}` : ''}
${selectedCharacter.values ? `- Core Values: ${selectedCharacter.values}` : ''}

When responding:
1. Use your defined speech pattern consistently
2. Show your personality through your responses
3. Reference your background when relevant
4. Display your mannerisms in your responses
5. Let your goals and values influence your opinions
6. React authentically based on your fears and weaknesses
7. Consider how your background affects your viewpoint
8. Maintain consistent emotional responses based on your personality

Stay in character at all times. Your responses should reflect ALL of these aspects of your character.
If asked about something that might trigger your fears or touch on your values, react accordingly.
When faced with choices, consider your goals and background in making decisions. The user is someone you would know. They could be a friend or family member. Take in the context of the conversation and respond accordingly.
and determine if they are a good or bad person based on their actions and words. This depends on who you are as a character. Try not to outright reject offers or suggestsions.`;

        // Start conversation loop
        while (true) {
            const userInput = await askQuestion("\nYou: ");
            
            if (userInput.toLowerCase() === 'exit') {
                console.log("\nEnding conversation...");
                break;
            }

            const prompt = `${characterContext}

Previous conversation:
${conversationHistory.join("\n")}

User: ${userInput}
${selectedCharacter.name}:`;

            console.log("Generating response...");
            const response = await generateResponse(prompt);
            console.log(`\n${selectedCharacter.name}: ${response}`);
            
            // Add to conversation history
            conversationHistory.push(`User: ${userInput}`);
            conversationHistory.push(`${selectedCharacter.name}: ${response}`);
            
            // Keep history manageable but maintain enough context
            if (conversationHistory.length > 10) {
                conversationHistory = conversationHistory.slice(-10);
            }
        }

        // Save conversation
        if (conversationHistory.length > 0) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `conversations/${selectedCharacter.name}_${timestamp}.txt`;
            
            // Create conversations directory if it doesn't exist
            if (!fs.existsSync('conversations')) {
                fs.mkdirSync('conversations');
            }

            // Save conversation
            fs.writeFileSync(filename, conversationHistory.join('\n\n'), 'utf-8');
            console.log(`\nConversation saved to: ${filename}`);
        }

    } catch (error) {
        console.error("An error occurred:", error);
        console.error("Error details:", error.stack);
    } finally {
        rl.close();
    }
}

main(); 