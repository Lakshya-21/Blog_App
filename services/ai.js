const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function generateSummary(blogText) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
You are an AI assistant.
Summarize the following blog in 5-8 concise bullet points.
Keep the language simple.
Do not invent information.
Return only the bullet points.
Blog:
${blogText}
        `,
    });

    return response.text.trim();
}

module.exports = {
    generateSummary,
};