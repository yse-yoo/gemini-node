const { GoogleGenAI } = require("@google/genai");

require('dotenv').config();

const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const apiKey = process.env.GEMINI_API_KEY;

async function run() {
    if (!apiKey) {
        console.error("GEMINI_API_KEY is not set in environment variables.");
        return;
    }

    const prompt = "世界の人口は何人ですか？";

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
        model: modelName,
        config: { maxOutputTokens: 512 },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const result =
        response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!result) throw "Empty result";
    console.log("Response:", result);
}

run();