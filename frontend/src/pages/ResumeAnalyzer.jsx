import { useContext, useState, useRef } from "react";
import Output from "../components/Output";
import { IoIosDocument } from "react-icons/io";
import { WhatAIDataContext } from "../DataContex/WhatAIData.jsx";
import { toast } from 'react-toastify';

function ResumeAnalyzer() {
    const { ResumeAnalyzer } = useContext(WhatAIDataContext);
    const [temppdf, setTemppdf] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        if (file.type !== 'application/pdf') {
            toast.error("Please select a valid PDF file");
            e.target.value = '';
            return;
        }
        
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            toast.error("PDF must be smaller than 5MB");
            e.target.value = '';
            return;
        }

        setTemppdf(file);
    };

    const handleFileUpload = async () => {
        if (!temppdf || !prompt.trim()) {
            toast.error("Please select a PDF and enter job description");
            return;
        }

        setIsLoading(true);
        setResult(null);

        const data = new FormData();
        data.append('pdf', temppdf);
        data.append('job_description', prompt);

        try {
            const response = await ResumeAnalyzer(data);
            setResult(response);
        } catch (error) {
            console.error(error);
            toast.error(error?.data?.message || "Failed to analyze resume");
        } finally {
            setIsLoading(false);
        }
    };

    const clearSelection = () => {
        setTemppdf(null);
        setPrompt("");
        setResult(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col lg:flex-row p-4 sm:p-6 w-full justify-center gap-6 lg:gap-10 xl:gap-14">
            {/* Input Panel */}
            <div className="w-full lg:w-[45%] xl:w-[35%] p-6 sm:p-8 lg:p-10 flex flex-col rounded-2xl bg-white shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <h1 className="text-xl sm:text-2xl text-stone-600 font-bold">AI Resume Analyzer</h1>
                        <p className="text-sm text-gray-500 mt-1">Analyze resumes with AI</p>
                    </div>
                    <IoIosDocument className="text-3xl sm:text-4xl text-stone-600 flex-shrink-0" />
                </div>
                
                <div className="w-full py-4">
                    <p className="text-sm font-semibold mb-2">Upload Resume</p>
                    <input 
                        ref={fileInputRef} 
                        accept="application/pdf" 
                        onChange={handleFileChange} 
                        type="file" 
                        className="w-full text-sm text-gray-600 px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-stone-50 file:text-stone-600"
                    />
                    {temppdf && (
                        <p className="text-xs text-gray-500 mt-2">
                            Selected: {temppdf.name} ({(temppdf.size / 1024).toFixed(1)} KB)
                        </p>
                    )}
                </div>

                <div className="w-full py-3">
                    <p className="text-sm font-semibold mb-2">Enter Job Description</p>
                    <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter job description..."
                        rows={4}
                        className="w-full text-sm text-gray-600 px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 resize-none"
                    />
                </div>

                <button 
                    disabled={isLoading || !temppdf} 
                    onClick={handleFileUpload} 
                    className="bg-stone-600 hover:bg-stone-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium active:scale-95"
                >
                    <IoIosDocument size={20} />
                    {isLoading ? "Analyzing..." : "Analyze Resume"}
                </button>

                {(temppdf || result) && (
                    <button
                        onClick={clearSelection}
                        className="text-sm text-gray-500 mt-3 hover:text-gray-700 underline text-center"
                    >
                        Clear & start over
                    </button>
                )}
            </div>

            {/* Output Panel */}
            <Output 
                title="Analysis Result" 
                result={result} 
                textClass="text-stone-600" 
                isLoading={isLoading}
                btnClass="bg-stone-600 hover:bg-stone-700" 
                icon1={<IoIosDocument className="text-3xl text-stone-600 mx-auto" />} 
                description="Click analyze resume button to get AI generated analysis"
            />
        </div>
    );
}

export default ResumeAnalyzer;