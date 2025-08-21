import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_API_KEY;
const client = new GoogleGenAI({ apiKey: API_KEY,  })

async function gemini_query(query) {
    const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: query
    })
    
    return response.text
}



export default gemini_query