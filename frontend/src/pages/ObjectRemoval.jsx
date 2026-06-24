import { useContext, useState, useRef } from "react";
import Output from "../components/Output";
import { FcRemoveImage } from "react-icons/fc";
import { ImageOff } from "lucide-react";
import { WhatAIDataContext } from "../DataContex/WhatAIData.jsx";
import { toast } from 'react-toastify';
import { RiAiGenerate2 } from "react-icons/ri";

function ObjectRemoval() {
    const { ObjectRemover } = useContext(WhatAIDataContext);
    const [tempimage, setTempimage] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        if (!file.type.startsWith('image/')) {
            toast.error("Please select a valid image file");
            e.target.value = '';
            return;
        }
        
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            toast.error("Image must be smaller than 5MB");
            e.target.value = '';
            return;
        }

        setTempimage(file);
    };

    const handleFileUpload = async () => {
        if (!tempimage || !prompt.trim()) {
            toast.error("Please select an image and enter prompt");
            return;
        }

        setIsLoading(true);
        setResult(null);

        const data = new FormData();
        data.append('image', tempimage);
        data.append('prompt', prompt);

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
                        <h1 className="text-xl sm:text-2xl text-sky-500 font-bold">AI Object Removal</h1>
                        <p className="text-sm text-gray-500 mt-1">Remove objects from images with AI</p>
                    </div>
                    <FcRemoveImage className="text-3xl sm:text-4xl flex-shrink-0" />
                </div>
                
                <div className="w-full py-4">
                    <p className="text-sm font-semibold mb-2">Upload Image</p>
                    <input 
                        ref={fileInputRef} 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        type="file" 
                        className="w-full text-sm text-gray-600 px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-sky-50 file:text-sky-600"
                    />
                    {tempimage && (
                        <p className="text-xs text-gray-500 mt-2">
                            Selected: {tempimage.name} ({(tempimage.size / 1024).toFixed(1)} KB)
                        </p>
                    )}
                </div>

                <div className="w-full py-3">
                    <p className="text-sm font-semibold mb-2">Describe Object To Remove</p>
                    <input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., remove car from background"
                        className="border border-gray-300 px-4 py-2.5 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm"
                    />
                    {tempimage && (
                        <img 
                            src={URL.createObjectURL(tempimage)} 
                            alt="Selected preview" 
                            className="w-full h-48 sm:h-56 lg:h-[30vh] object-contain rounded-lg mt-3 bg-gray-50" 
                        />
                    )}
                </div>

                <button 
                    disabled={isLoading || !tempimage} 
                    onClick={handleFileUpload} 
                    className="bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium active:scale-95"
                >
                    <RiAiGenerate2 size={20} />
                    {isLoading ? "Processing..." : "Remove Object"}
                </button>

                {(tempimage || result) && (
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
                result={result} 
                title="Processed Image" 
                textClass="text-sky-500" 
                btnClass="bg-sky-500 hover:bg-sky-600" 
                icon1={<ImageOff className="text-3xl text-sky-500 mx-auto" />} 
                description="Click generate object removal button to get AI generated result"
            />
        </div>
    );
}

export default ObjectRemoval;