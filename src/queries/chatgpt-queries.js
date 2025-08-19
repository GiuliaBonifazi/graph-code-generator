const API_KEY = "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"

import OpenAI from "openai"

async function gpt5_query(query) {
    const client = new OpenAI({
        apiKey: API_KEY,
        dangerouslyAllowBrowser: true
    })
    const response = await client.responses.create({
        model: "gpt-5",
        input: query
    });

    console.log(response)
}

export default gpt5_query
