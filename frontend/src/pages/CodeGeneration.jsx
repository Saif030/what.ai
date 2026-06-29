import { FaCode, FaTerminal } from "react-icons/fa";    
import { useState, useContext } from "react";
import { toast } from 'react-toastify';
import { WhatAIDataContext } from "../DataContex/WhatAIData.jsx";
import { CodeXml } from "lucide-react";
import Output from "../components/Output.jsx";

// ─── Main CodeGeneration Component ─────────────────────────────
function CodeGeneration() {
    const [prompt, setPrompt] = useState("");
    const [displayedResult, setDisplayedResult] = useState("");
    const [isLoading , setIsLoading] = useState(false);
    const { AICodeWriter } = useContext(WhatAIDataContext);

    const onSubmit = async () => {
        if (!prompt.trim()) {
            toast.error("Please enter a description");
            return;
        }
        setIsLoading(true);
        setDisplayedResult("");

        try {
            await AICodeWriter(
                prompt,
                // onChunk - update UI in real-time as chunks arrive
                (_, fullContent) => {
                    setDisplayedResult(fullContent);
                    setIsLoading(false);
                },
                // onDone - stream completed
                (finalContent) => {
                    setDisplayedResult(finalContent);
                    setIsLoading(false);
                }
            );
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate code. Please try again.");
            setIsLoading(false);
        }
    };

    return (
    <div className="flex flex-col lg:flex-row p-4 sm:p-6 w-full justify-center gap-6 lg:gap-10 xl:gap-14">
            {/* Input Panel */}
            <div className="w-full lg:w-[45%] xl:w-[35%] p-6 sm:p-8 lg:p-10 flex flex-col gap-1 rounded-2xl bg-white shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <h1 className="text-xl sm:text-2xl text-zinc-500 font-bold">AI Code Generator</h1>
                        <p className="text-sm text-gray-500 mt-1">Generate production-ready code with AI</p>
                    </div>
                    <CodeXml className="text-3xl sm:text-4xl text-zinc-500 flex-shrink-0" />
                </div>

                <div className="w-full py-4">
                    <p className="text-sm font-semibold mb-2">What do you want to build?</p>
                    <textarea 
                        value={prompt} 
                        onChange={(e) => setPrompt(e.target.value)} 
                        placeholder="e.g., Create a React hook for infinite scroll with intersection observer..." 
                        className="w-full text-sm text-gray-600 px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-500 resize-none h-28"
                    />
                </div>

                <button 
                    onClick={onSubmit} 
                    disabled={isLoading || !prompt.trim()}
                    className="bg-zinc-500 hover:bg-zinc-600 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium active:scale-95 mt-2"
                >
                    {isLoading ? (
                        "Generating..."
                    ) : (
                        <><FaCode size={20} /> Generate Code</>
                    )}
                </button>
            </div>

            {/* Output Panel */}
            <Output
                isLoading={false} 
                title="Generated Code" 
                result={displayedResult}
                textClass="text-zinc-500"
                btnClass="bg-zinc-500 hover:bg-zinc-600"
                icon1={<FaTerminal className="text-3xl text-zinc-500 mx-auto" />} 
                description="Click generate code button to get an AI generated solution"
            />
    </div>
    );
}

export default CodeGeneration;