import axios from 'axios';

const articleWriterAI = async (prompt) => {
    const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
    const invokeUrl = "https://integrate.api.nvidia.com/v1/chat/completions";

    const headers = {
        "Authorization": `Bearer ${NVIDIA_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
    };

    const payload = {
        "model": "moonshotai/kimi-k2.6",
        "messages": [{ "role": "user", "content": prompt }],
        "max_tokens": 16384,
        "temperature": 1.00,
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

export { articleWriterAI }