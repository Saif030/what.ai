import Output from "../components/Output";
import { IoIosDocument } from "react-icons/io";
import { WhatAIDataContext } from "../DataContex/WhatAIData.jsx";
import { toast } from 'react-toastify';
import { useContext , useState , useRef } from "react";

function ResumeAnalyzer() {
    const { ResumeAnalyzer } = useContext(WhatAIDataContext);
    const [temppdf, setTemppdf] = useState(null);
    const [prompt , setPrompt] = useState(null)
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (!file) return;
        
        // Validate file type
        if (file.type !== 'application/pdf') {
            toast.error("Please select a valid pdf file");
            e.target.value = ''; // Reset input
            return;
        }
        
        // Optional: validate file size (e.g., 5MB max)
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            toast.error("Pdf must be smaller than 5MB");
            e.target.value = '';
            return;
        }

        setTemppdf(file);
    };

    const handleFileUpload = async () => {
        if (!temppdf || !prompt) {
            toast.error("Please select an pdf and enter job description");
            return;
        }

        setIsLoading(true);
        setResult(null); // Use null instead of empty string for consistency

        const data = new FormData();
        data.append('pdf', temppdf);
        data.append('job_description',prompt);

        try {
            const response = await ResumeAnalyzer(data);
            setResult(response);
        } catch (error) {
            console.error(error);
            toast.error(error?.data?.message || "Failed to remove object");
        } finally {
            setIsLoading(false);
        }
    };

    const clearSelection = () => {
        setTemppdf(null);
        setPrompt(null)
        setResult(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    return (
<div className="flex p-6 w-full justify-center gap-14">
            <div className="w-[35vw] max-h-fit p-10 flex flex-col rounded-2xl bg-white shadow-lg">
                <div className="flex item-center gap-3">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl text-taupe-500 font-bold">AI Resume Analyzer</h1>
                        <p className="text-sm text-gray-500">Analyze resumes with AI</p>
                    </div>
                    <IoIosDocument className="text-4xl text-taupe-500" />
                </div>
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">Upload Resume</p>
                    <input ref={fileInputRef} accept="application/pdf" onChange={handleFileChange} type="file" placeholder="Upload resume" className="w-full text-sm text-gray-600 mt-2 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none" />
                </div>
                {temppdf && (
                    <p className="text-xs text-gray-500 mt-1">
                        Selected: {temppdf.name} ({(temppdf.size / 1024).toFixed(1)} KB)
                    </p>
                )}
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">Enter Job Description</p>
                    <input ref={fileInputRef} onChange={(e) => (setPrompt(e.target.value))} type="text" placeholder="Enter job description" className="w-full text-sm text-gray-600 mt-2 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none" />
                </div>
                <button disabled={isLoading || !temppdf} onClick={handleFileUpload} className="bg-taupe-500 hover:bg-taupe-600 disabled:bg-taupe-300 disabled:cursor-not-allowed cursor-pointer text-white px-4 py-2 mt-4 rounded-xl flex items-center justify-center gap-2"><IoIosDocument />{ isLoading ? "Analyzing..." : "Analyze Resume"}</button>
            </div>
            <Output title={"Analysis Result"} result={result} textClass="text-taupe-500" btnClass="bg-taupe-500 hover:bg-taupe-600" icon1={<IoIosDocument className="text-3xl text-taupe-500 mx-auto" />} description={"click analyze resume button get AI generated analysis"}/>
        </div>
    )
}

export default ResumeAnalyzer;