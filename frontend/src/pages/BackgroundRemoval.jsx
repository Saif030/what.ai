import { useContext, useState, useRef } from "react";
import Output from "../components/Output";
import { WhatAIDataContext } from "../DataContex/WhatAIData.jsx";
import { toast } from 'react-toastify';
import { TbBackground } from "react-icons/tb";

function BackgroundRemoval() {
    const { BackGroundRemover } = useContext(WhatAIDataContext);
    const [tempimage, setTempimage] = useState(null);
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
        if (!tempimage) {
            toast.error("Please select an image");
            return;
        }

        setIsLoading(true);
        setResult(null); // Use null instead of empty string for consistency

        const data = new FormData();
        data.append('image', tempimage);

        try {
            const response = await BackGroundRemover(data);
            setResult(response);
        } catch (error) {
            console.error(error);
            toast.error(error?.data?.message || "Failed to remove background");
        } finally {
            setIsLoading(false);
        }
    };

    // Optional: clear selection to allow re-uploading same file
    const clearSelection = () => {
        setTempimage(null);
        setResult(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="flex p-6 w-full justify-center gap-14">
            <div className="w-[35vw] max-h-fit p-10 flex flex-col rounded-2xl bg-white shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl text-orange-500 font-bold">AI Background Removal</h1>
                        <p className="text-sm text-gray-500">Remove backgrounds from images with AI</p>
                    </div>
                    <TbBackground className="text-4xl text-orange-500" />
                </div>
                
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">Upload Image</p>
                    <input
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        type="file"
                        accept="image/*"
                        className="w-full text-sm text-gray-600 mt-2 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {tempimage && (
                        <p className="text-xs text-gray-500 mt-1">
                            Selected: {tempimage.name} ({(tempimage.size / 1024).toFixed(1)} KB)
                        </p>
                    )}
                    {
                        tempimage ? <img src={URL.createObjectURL(tempimage)} alt="Selected" className="w-full h-[48vh] object-contain rounded-lg mt-2" /> : null
                    }
                </div>

                <button
                    disabled={isLoading || !tempimage}
                    onClick={handleFileUpload}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white px-4 py-2 mt-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                    <TbBackground />
                    {isLoading ? "Processing..." : "Remove Background"}
                </button>
                
                {/* Optional clear button */}
                {(tempimage || result) && (
                    <button
                        onClick={clearSelection}
                        className="text-sm text-gray-500 mt-2 hover:text-gray-700 underline"
                    >
                        Clear & start over
                    </button>
                )}
            </div>

            <Output
                title="Processed Image"
                result={result}
                textClass="text-orange-500"
                btnClass="bg-orange-500 hover:bg-orange-600"
                icon1={<TbBackground className="text-3xl text-orange-500 mx-auto" />}
                description="Click the button to generate AI background removal"
            />
        </div>
    );
}

export default BackgroundRemoval;