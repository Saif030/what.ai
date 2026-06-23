import { articleWriterAI } from "../utils/aiIntegration.js";
import { Chat } from "../models/chat.model.js";
import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/CloudinaryConfig.js";
import Transaction from "../models/billing.model.js";
import { PdfReader } from "pdfreader";

const extractTextFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    let text = "";

    new PdfReader().parseBuffer(buffer, (err, item) => {
      if (err) {
        reject(err);
      } else if (!item) {
        resolve(text);
      } else if (item.text) {
        text += item.text + " ";
      }
    });
  });
};

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
                category: "article"
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

    const { keyword, categeory } = req.body;
    const { userId } = req.auth()
    const prompt = `
    You are an expert content strategist and SEO copywriter who writes high-converting blog titles.

    Generate exactly 10 catchy, unique blog post titles using:
    - Keyword: ${keyword}
    - Category: ${category}

    Requirements:
    - Each title must naturally include the keyword "${keyword}" (or a close variation).
    - Titles should fit the "${category}" niche and appeal to readers searching that topic.
    - Mix styles across the 10: how-to, listicle, question-based, "ultimate guide", and curiosity/benefit-driven.
    - Keep each title between 6-12 words.
    - Make them engaging and clickable, but never misleading or clickbait.
    - No repeated phrasing patterns (e.g. don't start every title the same way).

    Output format:
    - Return ONLY the 10 titles, one per line.
    - No numbering, bullet points, quotation marks, markdown, or explanations.
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
            return res.status(500).json({ message: "Failed to generate blog titles" , prompt , categeory });
        }
        return res.status(200).json({ message: "Blog titles generated successfully", prompt , keyword , categeory , data: response });
    }catch(error){
        return res.status(500).json({ message: "Internal server error" , error });
    }
}

const backgorundRemover = async (req,res) => {
    const image = req.file.buffer;
    const { userId } = req.auth()
    if(!image){
        return res.status(400).json({message: "No image provided"});
    }

    if(!userId){
        return res.status(401).json({message: "Unauthorized"});
    }

    try{
        const user = await User.findOne({clerkId: userId});

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        const transaction = await Transaction.findOne({
            clerkId : user.clerkId
        });

        if(!transaction){
            return res.status(400).json({ message: "Transaction not found not a premium subscriber" });
        }

        if(transaction.slug !== "premium"){
            return res.status(400).json({ message: "Not a premium subscriber" });
        }

        if(user.credits < 1){
            return res.status(400).json({ message: "Not enough credits" });
        }

        const { originalImageUrl, backgroundRemovedUrl } = await uploadOnCloudinary(image,true,false);

        if(!originalImageUrl || !backgroundRemovedUrl){
            return res.status(500).json({message: "Failed to upload image"});
        }

        if(originalImageUrl && backgroundRemovedUrl){
            // Save to history
            const chat = await Chat.create({
                userId,
                query: originalImageUrl,
                response: backgroundRemovedUrl,
                category: "background-remover"
            });
            user.credits -= 5;
            await user.save();
            await chat.save();
        }

        return res.status(200).json({ success: true ,originalImageUrl, backgroundRemovedUrl });

    }catch(error){
        return res.status(500).json({ message: "Internal server error" , error });
    }
}

const objectRemover = async (req,res) => {
    const image = req.file.buffer;
    const { userId } = req.auth()
    const { prompt } = req.body;
    if(!image){
        return res.status(400).json({message: "No image provided"});
    }
    if(!prompt){
        return res.status(400).json({message: "No prompt provided"});
    }

    try{
        const user = await User.findOne({clerkId: userId});

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        const transaction = await Transaction.findOne({
            clerkId : user.clerkId
        });

        if(!transaction){
            return res.status(400).json({ message: "Transaction not found not a premium subscriber" });
        }

        if(transaction.slug !== "premium"){
            return res.status(400).json({ message: "Not a premium subscriber" });
        }

        if(user.credits < 1){
            return res.status(400).json({ message: "Not enough credits" });
        }

        const { originalImageUrl, objectRemovedUrl } = await uploadOnCloudinary(image,false,true,prompt);

        if(!originalImageUrl || !objectRemovedUrl){
            return res.status(500).json({message: "Failed to upload image"});
        }

        if(originalImageUrl && objectRemovedUrl){
            // Save to history
            const chat = await Chat.create({
                userId,
                query: originalImageUrl,
                response: objectRemovedUrl,
                category: "object-remover"
            });
            user.credits -= 10;
            await user.save();
            await chat.save();
        }

        return res.status(200).json({ success: true ,originalImageUrl, objectRemovedUrl });

    }catch(error){
        return res.status(500).json({ message: "Internal server error" , error });
    }
}

const resumeAnalyzer = async (req, res) => {
    const pdf = req.file.buffer;
    const { job_description } = req.body;
    const { userId } = req.auth()
    if(!pdf){
        return res.status(400).json({message: "No pdf provided"});
    }

    if(!userId){
        return res.status(401).json({message: "Unauthorized"});
    }

    if(!job_description){
        return res.status(400).json({message: "No job description provided"});
    }

    try{
        const user = await User.findOne({clerkId: userId});

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        const transaction = await Transaction.findOne({
            clerkId : user.clerkId
        });

        if(!transaction){
            return res.status(400).json({ message: "Transaction not found not a premium subscriber" });
        }

        if(transaction.slug !== "premium"){
            return res.status(400).json({ message: "Not a premium subscriber" });
        }

        if(user.credits < 1){
            return res.status(400).json({ message: "Not enough credits" });
        }

        const response = await uploadOnCloudinary(pdf);

        if(!response){
            return res.status(500).json({message: "Failed to upload image"});
        }

        const result = await extractTextFromBuffer(pdf);

        console.log(result);

        if(!result){
            return res.status(500).json({message: "Failed to parse pdf"});
        }

        const prompt =`
You are an expert technical recruiter. Your job is to evaluate a candidate resume against a job description and return a structured JSON assessment.

JOB DESCRIPTION:
${job_description}

RESUME:
${result?.text}

Return ONLY valid JSON, no explanation, no markdown, no code fences, and no </think> tags or reasoning text. Use this exact structure:
{{
  "score": <integer 0-100>,
  "recommendation": "<Strong Fit | Moderate Fit | Not Fit>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "gaps": ["<gap 1>", "<gap 2>"],
  "summary": "<2-3 sentence hiring manager summary>"
}}

Scoring guide:give ats score based on the resume and job description

Be specific. Mention actual skills and experience from the resume. Do not invent information.
        `
        const aiResponse = await articleWriterAI(prompt);

        if(!aiResponse){
            return res.status(500).json({message: "Failed to generate AI response"});
        }

        if(aiResponse){
            // Save to history
            const chat = await Chat.create({
                userId,
                query: response?.secureUrl,
                response: aiResponse?.choices[0]?.message?.content,
                category: "resume-analyzer"
            });
            user.credits -= 30;
            await user.save();
            await chat.save();
        }

        return res.status(200).json({ success: true , pdfUrl:response?.secureUrl , data : aiResponse });

    }catch(error){
        return res.status(500).json({ message: "Internal server error" , error });
    }
}

export { articleWriter , blogTitleGenerator , backgorundRemover , objectRemover , resumeAnalyzer }