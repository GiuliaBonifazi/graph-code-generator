import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_API_KEY;
const client = new GoogleGenAI({ apiKey: API_KEY,  })

async function gemini_query(query) {
    try {
        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: query
        })
        return {
            text: response.text,
            ok: true
        }
    } catch {
        return {
            text: "",
            ok: false
        }
    }
    
}



export default gemini_query