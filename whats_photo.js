const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 1. クライアントの初期化 (ここは合っています)
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";

async function run() {
    const prompt = "この写真に人は何人くらいいますか？";

    // 写真読み込み (Bufferとして取得)
    const photoBuffer = fs.readFileSync('./images/photo6.webp');
    // Base64文字列へ変換
    const photoBase64 = photoBuffer.toString('base64');

    try {
        const response = await ai.models.generateContent({
            model: modelName,
            contents: [
                {
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                mimeType: 'image/webp',
                                data: photoBase64
                            }
                        }
                    ]
                }
            ]
        });
        const result =
            response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        // console.log(response);
        console.log(result);

    } catch (error) {
        console.error("Error:", error);
    }
}
run();