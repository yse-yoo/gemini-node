const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

require('dotenv').config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function run() {
    const prompt = "What is in this photo?";
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
        prompt,
        {
            inlineData: {
                data: Buffer.from(fs.readFileSync('./images/photo1.jpg')).toString("base64"),
                mimeType: 'image/jpeg'
            }
        }]
    );
    console.log(result.response.text());
}
run();