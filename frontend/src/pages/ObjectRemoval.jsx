import { RiAiGenerate2 } from "react-icons/ri";
import Output from "../components/Output";
import { FcRemoveImage } from "react-icons/fc";
import { ImageOff } from "lucide-react";
import { WhatAIDataContext } from "../DataContex/WhatAIData.jsx";
import { toast } from 'react-toastify';
import { useContext , useState , useRef } from "react";


function ObjectRemoval() {
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
                        <h1 className="text-2xl text-sky-500 font-bold">Upload Image</h1>
                        <p className="text-sm text-gray-500">Remove objects from images with AI</p>
                    </div>
                    <FcRemoveImage className="text-4xl text-sky-500" />
                </div>
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">Article Topic</p>
                    <input ref={fileInputRef} accept="image/*" onChange={handleFileChange} type="file" placeholder="Upload image" className="w-full text-sm text-gray-600 mt-2 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none" />
                    {tempimage && (
                        <p className="text-xs text-gray-500 mt-1">
                            Selected: {tempimage.name} ({(tempimage.size / 1024).toFixed(1)} KB)
                        </p>
                    )}
                </div>
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">Describe Object To Remove</p>
                    <input
                        onChange={(e) => setprompt(e.target.value)}
                        placeholder="ex:-remove car from background"
                        className="border border-gray-300 px-4 mt-2 py-2 rounded-lg w-full focus:outline-none focus:ring-0"
                    />
                    {
                        tempimage ? <img src={URL.createObjectURL(tempimage)} alt="Selected" className="w-full h-[30vh] object-contain rounded-lg mt-2" /> : null
                    }

                </div>
                <button disabled={isLoading || !tempimage} onClick={handleFileUpload} className="bg-sky-500 cursor-pointer disabled:bg-sky-300 disabled:cursor-not-allowed  text-white px-4 py-2 mt-4 rounded-xl flex items-center justify-center gap-2"><RiAiGenerate2 />{isLoading ? "...Processing Image" : "Remove Object"}</button>

                            
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
            <Output result={result} title={"Processed Image"} textClass="text-sky-500" btnClass="bg-sky-500 hover:bg-sky-600" icon1={<ImageOff className="text-3xl text-sky-500 mx-auto" />} description={"click generate object removal button get AI generated Object Removal"}/>
        </div>
    )
}

export default ObjectRemoval;