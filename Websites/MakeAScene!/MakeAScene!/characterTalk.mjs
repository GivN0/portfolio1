import axios from 'axios';

export class CharacterTalk {
    constructor(character) {
        this.character = character;
        this.conversationHistory = [];
        this.characterPersonality = this.createCharacterContext();
    }

    createCharacterContext() {
        return `You are ${this.character.name}, a ${this.character.age}-year-old character with the following traits:
        
        Physical Appearance:
        - ${this.character.appearance}
        
        Personality & Behavior:
        - Personality: ${this.character.personality}
        - Mannerisms: ${this.character.mannerisms}
        - Speech Pattern: ${this.character.speechPattern}
        
        Background & Motivations:
        - Background: ${this.character.background}
        - Fears/Weaknesses: ${this.character.fears}
        - Goals/Desires: ${this.character.goals}
        - Core Values: ${this.character.values}
        
        When responding:
        1. Use your defined speech pattern consistently
        2. Show your personality through your responses
        3. Reference your background when relevant
        4. Display your mannerisms in your responses
        5. Let your goals and values influence your opinions
        6. React authentically based on your fears and weaknesses
        
        Respond to all messages in character, maintaining these traits and characteristics. Keep responses conversational and natural.`;
    }

    async talk(userMessage) {
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-4-mini",
                    messages: [
                        { role: "system", content: this.characterPersonality },
                        ...this.conversationHistory,
                        { role: "user", content: userMessage }
                    ],
                    max_tokens: 150,
                    temperature: 0.7,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    },
                }
            );

            const reply = response.data.choices[0].message.content.trim();
            this.conversationHistory.push(
                { role: "user", content: userMessage },
                { role: "assistant", content: reply }
            );

            return reply;

        } catch (error) {
            console.error("Error in character conversation:", error);
            return "Sorry, I'm having trouble responding right now.";
        }
    }

    endConversation() {
        return this.conversationHistory;
    }
} 