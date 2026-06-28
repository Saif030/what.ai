import axios from 'axios';
import { Groq } from 'groq-sdk';
import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

const articleWriterAI = async (prompt) => {
    const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
    const invokeUrl = "https://integrate.api.nvidia.com/v1/chat/completions";

    const headers = {
        "Authorization": `Bearer ${NVIDIA_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
    };

    const payload = {
        "model": "openai/gpt-oss-120b",
        "messages": [{ "role": "user", "content": prompt }],
        "max_tokens": 4096,
        "temperature": 0.5,
        "top_p": 1.00,
        "stream": false,
        "chat_template_kwargs": { "thinking": false }
    };

    try {
        const response = await axios.post(invokeUrl, payload, {
            headers,
            responseType: 'json',
            decompress: true 
        });
        return response.data; // ✅ this actually returns from articleWriterAI now
    } catch (error) {
        if (error.response) {
            console.error(`HTTP ${error.response.status}`, error.response.data);
        } else {
            console.error(error);
        }
        throw error; // ✅ re-throw so the caller knows it failed
    }
};

const groq = new Groq({
    apiKey: process.env.GROQ_API
});

const aiWriter = async (prompt) => {
    try{
        const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
            "role": "user",
            "content": prompt
            }
        ],
        "model": "qwen/qwen3-32b",
        "temperature": 0.6,
        "max_completion_tokens": 4096,
        "top_p": 0.95,
        "stream": false,
        "reasoning_effort": "none",
        "stop": null
        });

       return chatCompletion;
    }
   catch (error) {
        if (error.response) {
            console.error(`HTTP ${error.response.status}`, error.response.data);
        } else {
            console.error(error);
        }
        throw error; // ✅ re-throw so the caller knows it failed
    }
   
}

const streamCodeWriter = async (prompt, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "stepfun-ai/step-3.5-flash",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    let fullResponse = "";
    let fullReasoning = "";

    for await (const chunk of completion) {
      const delta = chunk.choices[0]?.delta;

      if (!delta) continue;

      if (delta.reasoning_content) {
        fullReasoning += delta.reasoning_content;

        res.write(
          `data: ${JSON.stringify({
            type: "reasoning",
            content: delta.reasoning_content,
          })}\n\n`
        );
      }

      if (delta.content) {
        fullResponse += delta.content;

        res.write(
          `data: ${JSON.stringify({
            type: "content",
            content: delta.content,
          })}\n\n`
        );
      }
    }

    res.write(`data: ${JSON.stringify({ type: "done" })}\n\n`);

    return {
      fullResponse,
      fullReasoning,
    };
  } catch (err) {
    res.write(
      `data: ${JSON.stringify({
        type: "error",
        message: err.message,
      })}\n\n`
    );

    throw err;
  }
};


export { articleWriterAI, aiWriter, streamCodeWriter }