import { RiAiGenerate2, RiAiGenerate, RiAiGenerateText } from "react-icons/ri";
import Output from "../components/Output";
import { useState, useContext } from "react";
import { toast } from 'react-toastify';
import { WhatAIDataContext } from "../DataContex/WhatAIData.jsx";

function ArticleWriting() {
    const [topic, setTopic] = useState("");
    const [length, setLength] = useState("short");
    const [result, setResult] = useState(""); 
    const [isLoading, setIsLoading] = useState(false);
    
    const { ArticleWriter } = useContext(WhatAIDataContext);

    const onSubmit = async () => {
        if (!topic.trim()) {
            toast.error("Please enter a topic");
            return;
        }

        setIsLoading(true);
        setResult("");

        try {
            const response = await ArticleWriter(topic, length);
            setResult(response); 
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to generate article. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col lg:flex-row p-4 sm:p-6 w-full justify-center gap-6 lg:gap-10 xl:gap-14">
            {/* Input Panel */}
            <div className="w-full lg:w-[45%] xl:w-[35%] p-6 sm:p-8 lg:p-10 flex flex-col gap-1 rounded-2xl bg-white shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <h1 className="text-xl sm:text-2xl text-blue-500 font-bold">AI Article Generator</h1>
                        <p className="text-sm text-gray-500 mt-1">Generate high-quality articles with AI</p>
                    </div>
                    <RiAiGenerateText className="text-3xl sm:text-4xl text-blue-500 flex-shrink-0" />
                </div>
                
                <div className="w-full py-4">
                    <p className="text-sm font-semibold mb-2">Article Topic</p>
                    <input 
                        type="text" 
                        value={topic} 
                        onChange={(e) => setTopic(e.target.value)} 
                        placeholder="The Future of AI in Web Development" 
                        className="w-full text-sm text-gray-600 px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                
                <div className="w-full py-3">
                    <p className="text-sm font-semibold mb-3">Article Length</p>
                    <div className="flex flex-wrap gap-3">
                        <button 
                            onClick={() => setLength("short")} 
                            className={`
                                px-4 py-2 rounded-full text-sm transition-all active:scale-95
                                ${length === "short" 
                                    ? "bg-blue-500 text-white shadow-md" 
                                    : "text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200"
                                }
                            `}
                        >
                            Short (200-500 words)
                        </button>

                        <button 
                            onClick={() => setLength("long")} 
                            className={`
                                px-4 py-2 rounded-full text-sm transition-all active:scale-95
                                ${length === "long" 
                                    ? "bg-blue-500 text-white shadow-md" 
                                    : "text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200"
                                }
                            `}
                        >
                            Long (1000+ words)
                        </button>
                    </div>
                </div>
                
                <button 
                    onClick={onSubmit} 
                    disabled={isLoading || !topic.trim()}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium active:scale-95 mt-2"
                >
                    {isLoading ? (
                        "Generating..."
                    ) : (
                        <><RiAiGenerate2 size={20} /> Generate Article</>
                    )}
                </button>
            </div>

            {/* Output Panel */}
            <Output
                isLoading = {isLoading} 
                title="Generated Article" 
                result={result}
                textClass="text-blue-500"
                btnClass="bg-blue-500 hover:bg-blue-600"
                icon1={<RiAiGenerate className="text-3xl text-blue-500 mx-auto" />} 
                description="Click generate article button to get an AI generated Article"
            />
        </div>
    );
}

export default ArticleWriting;