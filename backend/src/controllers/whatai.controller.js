import { articleWriterAI } from "../utils/aiIntegration.js";

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
        const response = await articleWriterAI(prompt);
        if(!response){
            return res.status(500).json({ message: "Failed to generate article" , articlePrompt , lengthPreset });
        }
        return res.status(200).json({ message: "Article generated successfully", prompt , lengthPreset , data: response });
    }catch(error){
        return res.status(500).json({ message: "Internal server error" , error });
    }

}

export { articleWriter }