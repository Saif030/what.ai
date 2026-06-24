import { RiAiGenerate2 } from "react-icons/ri";
import { RiAiGenerate } from "react-icons/ri";
import { RiAiGenerateText } from "react-icons/ri";
import Output from "../components/Output";
import { useState, useContext } from "react";
import { toast } from 'react-toastify';
import { WhatAIDataContext } from "../DataContex/WhatAIData.jsx";

function ArticleWriting() {
    const [topic, setTopic] = useState("");
    const [length, setLength] = useState("short");
    
    // NEW: Added states for result and loading
    const [result, setResult] = useState(""); 
    const [isLoading, setIsLoading] = useState(false);
    
    const { ArticleWriter } = useContext(WhatAIDataContext);

    const onSubmit = async () => {
        if (!topic.trim()) {
            toast.error("Please enter a topic");
            return;
        }

        setIsLoading(true);
        setResult(""); // Clear previous result

        try {
            const response = await ArticleWriter(topic, length);
            
            // Note: Adjust 'response.article' based on what your backend actually returns.
            // If your backend returns a string directly, just use 'response'
            setResult(response); 
            
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to generate article. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div className="flex p-6 w-full justify-center gap-14 flex-wrap lg:flex-nowrap">
            {/* Input Section */}
            <div className="w-full lg:w-[35vw] p-10 flex flex-col gap-1 min-h-[25vw] rounded-2xl bg-white shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-bold">AI Article Generator</h1>
                        <p className="text-sm text-gray-500">Generate high-quality articles with AI</p>
                    </div>
                    <RiAiGenerateText className="text-4xl text-blue-500" />
                </div>
                
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">Article Topic</p>
                    <input 
                        type="text" 
                        value={topic} 
                        onChange={(e) => setTopic(e.target.value)} 
                        placeholder="The Future of AI in Web Development" 
                        className="w-full text-sm text-gray-600 mt-2 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">Article Length</p>
                    <div className="flex gap-4 mt-3">
                        <div 
                            onClick={() => setLength("short")} 
                            className={`cursor-pointer flex items-center gap-2 text-sm text-blue-800 border border-indigo-200 rounded-full px-4 py-1 transition-all ${length === "short" ? "bg-blue-700 text-white shadow-sm" : "bg-blue-400/10 hover:bg-blue-400/15"}`}
                        >
                            <span className="text-sm">Short (200-500) Word</span>
                        </div>

                        <div 
                            onClick={() => setLength("long")} 
                            className={`cursor-pointer flex items-center gap-2 text-sm text-blue-800 border border-indigo-200 rounded-full px-4 py-1 transition-all ${length === "long" ? "bg-blue-700 text-white shadow-sm" : "bg-blue-400/10 hover:bg-blue-400/15"}`}
                        >
                            <span className="text-sm">Long (1000+) Word</span>
                        </div>
                    </div>
                </div>
                
                <button 
                    onClick={onSubmit} 
                    disabled={isLoading || !topic}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-4 py-2 mt-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                    {isLoading ? (
                        "Generating..."
                    ) : (
                        <><RiAiGenerate2 /> Generate Article</>
                    )}
                </button>
            </div>

            {/* Output Section */}
            {/* IMPORTANT: Make sure your <Output /> component accepts a "result" prop! */}
            <Output 
                title={"Generated Article"} 
                result={result} // <-- PASSED THE RESULT HERE
                resultColor={"blue-500"} 
                icon1={<RiAiGenerate className="text-3xl text-blue-500 mx-auto" />} 
                description={"Click generate article button to get an AI generated Article."}
            />
        </div>
    )
}

export default ArticleWriting;