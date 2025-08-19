import { GoogleGenAI } from "@google/genai";

const API_KEY = "AIzaSyBfZF_h2KuGWhrAoAcyPCfmrWMe4tVcHy0"

const client = new GoogleGenAI({ apiKey: API_KEY,  })

async function gemini_query(query) {
    const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: query
    })
    console.log(response.text)
}

export default gemini_query