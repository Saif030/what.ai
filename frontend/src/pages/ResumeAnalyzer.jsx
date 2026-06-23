import Output from "../components/Output";
import { IoIosDocument } from "react-icons/io";
import { WhatAIDataContext } from "../DataContex/WhatAIData.jsx";
import { toast } from 'react-toastify';
import { useContext , useState , useRef } from "react";

function ResumeAnalyzer() {
    const { ObjectRemover } = useContext(WhatAIDataContext);
    const [tempimage, setTempimage] = useState(null);
    const [ prompt , setprompt ] = useState(null)
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (!file) return;
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error("Please select a valid image file");
            e.target.value = ''; // Reset input
            return;
        }
        
        // Optional: validate file size (e.g., 5MB max)
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            toast.error("Image must be smaller than 5MB");
            e.target.value = '';
            return;
        }

        setTempimage(file);
    };

    const handleFileUpload = async () => {
        if (!tempimage || !prompt) {
            toast.error("Please select an image and enter prompt");
            return;
        }

        setIsLoading(true);
        setResult(null); // Use null instead of empty string for consistency

        const data = new FormData();
        data.append('image', tempimage);
        data.append('prompt',prompt);

        try {
            const response = await ObjectRemover(data);
            setResult(response);
        } catch (error) {
            console.error(error);
            toast.error(error?.data?.message || "Failed to remove object");
        } finally {
            setIsLoading(false);
        }
    };

    const clearSelection = () => {
        setTempimage(null);
        setprompt(null)
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
                    <input type="file" placeholder="Upload resume" className="w-full text-sm text-gray-600 mt-2 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none" />
                </div>
                <button className="bg-taupe-500 cursor-pointer text-white px-4 py-2 mt-4 rounded-xl flex items-center justify-center gap-2"><IoIosDocument />Analyze Resume</button>
            </div>
            <Output title={"Analysis Result"} textClass="text-taupe-500" btnClass="bg-taupe-500 hover:bg-taupe-600" icon1={<IoIosDocument className="text-3xl text-taupe-500 mx-auto" />} description={"click analyze resume button get AI generated analysis"}/>
        </div>
    )
}

export default ResumeAnalyzer;