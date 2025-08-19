import OpenAI from "openai";

const API_KEY = "sk-7dd9e1b31ee7492b9d2132f1ca15abae"

const client = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true
})

async function deepseek_query(query) {
    const completion = await client.chat.completions.create({
        messages: [{ role: "system", content: query }],
        model: "deepseek-chat",
    });

    console.log(completion.choices[0].message.content);
}

export default deepseek_query