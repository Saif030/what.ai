import { articleWriterAI } from "../utils/aiIntegration.js";
import { Chat } from "../models/chat.model.js";
import User from "../models/user.model.js";

const articleWriter = async (req , res) => {

    const LENGTH_PRESETS = {
    short: {
        label: "200-500 words",
        minWords: 200,
        maxWords: 500,
        maxTokens: 800,   // ~1.5x the upper word bound, converted to tokens, as a safety ceiling
    },
    long: {
        label: "1000+ words",
        minWords: 1000,
        maxWords: 1500,   // give it an upper bound too, otherwise it can run very long
        maxTokens: 2200,
    }
    };

    const { prompt , length } = req.body;
    const { userId } = req.auth();

    if(!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const lengthPreset = LENGTH_PRESETS[length];
    
    if(!lengthPreset) {
        return res.status(400).json({ message: "Invalid length" });
    }

    if(!prompt || prompt.trim().length === 0) {
        return res.status(400).json({ message: "Prompt is required" });
    }

    const articlePrompt = `Write an article about "${prompt}". 
    The article must be between ${lengthPreset.minWords} and ${lengthPreset.maxWords} words. 
    Stay within this range — do not significantly exceed it.`;

    try{
        const user = await User.findOne({clerkId: userId});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        if(user.credits < 1){
            return res.status(400).json({ message: "Not enough credits" });
        }

        const response = await articleWriterAI(prompt);

        if(response){
            // Save to history
            const chat = await Chat.create({
                userId,
                query: prompt,
                length,
                response: response?.choices[0]?.message?.content,
                category: "blog-title"
            });
            user.credits -= 1;
            await user.save();
            await chat.save();
        }

        if(!response){
            return res.status(500).json({ message: "Failed to generate article" , articlePrompt , lengthPreset });
        }
        return res.status(200).json({ message: "Article generated successfully", prompt , lengthPreset , data: response });
    }catch(error){
        return res.status(500).json({ message: "Internal server error" , error });
    }

}

const blogTitleGenerator = async (req, res) => {
    const { keyword, category } = req.body;
    const { userId } = req.auth()
    const prompt = `
    Act as a content strategist. Generate 10 catchy blog titles using:
    Keyword: ${keyword}
    Category: ${category}
    Make them SEO-friendly, click-worthy, only give titles ,and suitable for the target audience.
    `;
    
    try{
        const user = await User.findOne({clerkId: userId});

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        if(user.credits < 1){
            return res.status(400).json({ message: "Not enough credits" });
        }

        const response = await articleWriterAI(prompt);

        if(response){
            // Save to history
            const chat = await Chat.create({
                userId,
                query: prompt,
                response: response?.choices[0]?.message?.content,
                category: "blog-title"
            });
            user.credits -= 1;
            await user.save();
            await chat.save();
        }

        if(!response){
            return res.status(500).json({ message: "Failed to generate blog titles" , prompt , category });
        }
        return res.status(200).json({ message: "Blog titles generated successfully", prompt , keyword , category , data: response });
    }catch(error){
        return res.status(500).json({ message: "Internal server error" , error });
    }
}

export { articleWriter , blogTitleGenerator }