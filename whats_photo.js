const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

require('dotenv').config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function run() {
    // プロンプト
    const prompt = "この写真に人は何人くらいいますか？";

    // 写真読み込み
    const photo = fs.readFileSync('./images/photo6.webp');

    // LLMの選択「gemini-1.5-flash」
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Gemini API にリクエスト
    const result = await model.generateContent([
        prompt,
        {
            inlineData: {
                data: Buffer.from(photo).toString("base64"),
                mimeType: 'image/webp'
            }
        }]
    );
    console.log(result.response.text());
}
run();