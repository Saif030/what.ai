import { useState } from "react";
import Output from "../components/Output";
import { FaHashtag } from "react-icons/fa";
import { useContext } from "react";
import { toast } from 'react-toastify';
import { WhatAIDataContext } from "../DataContex/WhatAIData.jsx";

function TitleGenerator() {
    const [keyword,setkeyword] = useState("")
    const [category,setcategory] = useState("General")
    const [result, setResult] = useState(""); 
    const [isLoading, setIsLoading] = useState(false);
    const { TitleWriter } = useContext(WhatAIDataContext)

    const categoryList = ["General","Technology","Business","Health","Science","Education","Entertainment","Sports","Travel","Food","Lifestyle"]

    const onSubmit = async () => {
        if (!keyword.trim()) {
            toast.error("Please enter a keyword");
            return;
        }

        setIsLoading(true);
        setResult(""); // Clear previous result

        try {
            const response = await TitleWriter(keyword, category);
            
            // Note: Adjust 'response.article' based on what your backend actually returns.
            // If your backend returns a string directly, just use 'response'
            setResult(response.article || response); 
            
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to generate article. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex p-6 w-full justify-center gap-14">
            <div className="w-[35vw] p-10 flex flex-col gap-1 max-h-fit rounded-2xl bg-white shadow-lg">
                <div className="flex item-center gap-3">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl text-purple-500 font-bold">AI Article Generator</h1>
                        <p className="text-sm text-gray-500">Generate high-quality articles with AI</p>
                    </div>
                    <FaHashtag className="text-4xl text-purple-500" />
                </div>
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">KeyWord</p>
                    <input onChange={(e) => (setkeyword(e.target.value))} type="text" placeholder="The Future of AI in Web Development" className="w-full text-sm text-gray-600 mt-2 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none" />
                </div>
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">Category</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {categoryList.map((catg,index) => (
                            <div onClick={() => setcategory(catg)} key={index} className={`flex items-center gap-2 ${category === catg ? 'bg-purple-500 text-white' : 'text-purple-800 bg-purple-400/10'} border border-indigo-200 rounded-full px-4 py-1`}>
                                <span className="text-sm">{catg}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <button 
                    onClick={onSubmit} 
                    disabled={isLoading || !keyword}
                    className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 disabled:cursor-not-allowed text-white px-4 py-2 mt-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                    {isLoading ? (
                        "Generating..."
                    ) : (
                        <><FaHashtag /> Generate Titles</>
                    )}
                </button>
            </div>
            <Output title={"Generated Titles"} result={result} textClass = "text-purple-500" btnClass = "bg-purple-500 hover:bg-purple-600" icon1={<FaHashtag className="text-3xl text-purple-500 mx-auto" />} description={"click generate titles button get AI generated titles"}/>
        </div>
    )
}

export default TitleGenerator;