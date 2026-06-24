import { useState, useContext } from "react";
import Output from "../components/Output";
import { FaHashtag } from "react-icons/fa";
import { toast } from 'react-toastify';
import { WhatAIDataContext } from "../DataContex/WhatAIData.jsx";

function TitleGenerator() {
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("General");
    const [result, setResult] = useState(""); 
    const [isLoading, setIsLoading] = useState(false);
    const { TitleWriter } = useContext(WhatAIDataContext);

    const categoryList = ["General", "Technology", "Business", "Health", "Science", "Education", "Entertainment", "Sports", "Travel", "Food", "Lifestyle"];

    const onSubmit = async () => {
        if (!keyword.trim()) {
            toast.error("Please enter a keyword");
            return;
        }

        setIsLoading(true);
        setResult("");

        try {
            const response = await TitleWriter(keyword, category);
            setResult(response); 
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to generate titles. Please try again.");
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
                        <h1 className="text-xl sm:text-2xl text-purple-500 font-bold">AI Title Generator</h1>
                        <p className="text-sm text-gray-500 mt-1">Generate catchy blog titles with AI</p>
                    </div>
                    <FaHashtag className="text-3xl sm:text-4xl text-purple-500 flex-shrink-0" />
                </div>
                
                <div className="w-full py-4">
                    <p className="text-sm font-semibold mb-2">Keyword</p>
                    <input 
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)} 
                        type="text" 
                        placeholder="The Future of AI in Web Development" 
                        className="w-full text-sm text-gray-600 px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                <div className="w-full py-3">
                    <p className="text-sm font-semibold mb-3">Category</p>
                    <div className="flex flex-wrap gap-2">
                        {categoryList.map((cat, index) => (
                            <button
                                onClick={() => setCategory(cat)} 
                                key={index} 
                                className={`
                                    px-3 sm:px-4 py-1.5 rounded-full text-sm transition-all active:scale-95
                                    ${category === cat 
                                        ? 'bg-purple-500 text-white shadow-md' 
                                        : 'text-purple-800 bg-purple-50 hover:bg-purple-100 border border-purple-200'
                                    }
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={onSubmit} 
                    disabled={isLoading || !keyword.trim()}
                    className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium active:scale-95 mt-2"
                >
                    {isLoading ? (
                        "Generating..."
                    ) : (
                        <><FaHashtag size={18} /> Generate Titles</>
                    )}
                </button>
            </div>

            {/* Output Panel */}
            <Output 
                title="Generated Titles" 
                result={result} 
                textClass="text-purple-500" 
                btnClass="bg-purple-500 hover:bg-purple-600" 
                icon1={<FaHashtag className="text-3xl text-purple-500 mx-auto" />} 
                description="Click generate titles button to get AI generated titles"
            />
        </div>
    );
}

export default TitleGenerator;