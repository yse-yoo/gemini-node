const { GoogleGenerativeAI } = require("@google/generative-ai");

require('dotenv').config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function run() {
    // プロンプト
    const prompt = "世界の人口は何人ですか？";

    // LLMの選択「gemini-1.5-flash」
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Gemini API にリクエスト
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
}
run();