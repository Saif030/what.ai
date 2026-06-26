import { RotateCcw, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { v4 as uuidv4 } from 'uuid';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Output({ title, icon1, description, result, textClass = "text-blue-500", btnClass = "bg-blue-500 hover:bg-blue-600" , isLoading }) {
    return (
        <div className="w-full lg:w-[35vw] p-4 sm:p-6 lg:p-10 bg-white shadow-lg rounded-2xl flex flex-col max-h-[90vh] lg:max-h-none">
            
            {/* Header Section */}
            <div className="w-full flex sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pb-4 border-b border-gray-200">
                <h1 className={`text-lg sm:text-xl lg:text-2xl ${textClass} font-bold flex items-center gap-2`}>
                    {icon1}
                    <span className="truncate">{title}</span>
                </h1>
                <button className={`${btnClass} text-white px-3 sm:px-4 py-2 cursor-pointer rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm whitespace-nowrap transition-colors`}>
                    <RotateCcw size={14} className="sm:size-4" /> 
                    <span className="hidden sm:inline">Regenerate</span>
                    <span className="sm:hidden">Retry</span>
                </button>
            </div>

            {/* Body Content Area */}
            {isLoading ? 
            <div className="mt-4 sm:mt-6 flex-1 max-h-[70vh] sm:max-h-[72vh] overflow-y-auto pr-1 sm:pr-2">
                <DotLottieReact
                src="https://lottie.host/3a6636b1-cf7b-4b4c-b40d-b3677ef6b1ef/Yj7cpOsS1y.lottie"
                loop
                autoplay
                />
            </div>  :
            <div className="mt-4 sm:mt-6 flex-1 max-h-[70vh] sm:max-h-[72vh] overflow-y-auto pr-1 sm:pr-2">
                {result ? result?.chat?.isImage ? (
                   <div className="w-full h-auto sm:h-[70vh] flex flex-col items-center justify-center gap-4">
                    <img 
                        src={result?.chat?.response} 
                        className="w-full max-h-[50vh] sm:h-[65vh] object-contain rounded-lg" 
                        alt="Generated content" 
                    />
                    <a 
                        href={result?.chat?.response} 
                        download={`whatai-${uuidv4()}.jpg`}
                        className="w-full sm:w-auto"
                    >
                        <button 
                            className={`${btnClass} w-full sm:w-auto text-white px-4 py-2.5 cursor-pointer rounded-xl flex items-center justify-center gap-2 text-sm whitespace-nowrap transition-colors`} 
                            type="button"
                        >
                            <Download size={16} />
                            <span className="hidden sm:inline">Save Image</span>
                            <span className="sm:hidden">Save</span>
                        </button>
                    </a>
                   </div>
                ) : (
                    <div className="text-gray-700 text-sm leading-relaxed">
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p: ({ children }) => (
                                    <p className="mb-2 leading-7">{children}</p>
                                ),
                                h1: ({ children }) => (
                                    <h1 className="text-2xl sm:text-3xl font-bold mb-4">{children}</h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="text-xl sm:text-2xl font-semibold mb-3 mt-5">{children}</h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-lg sm:text-xl font-semibold mb-2 mt-4">{children}</h3>
                                ),
                                ul: ({ children }) => (
                                    <ul className="list-disc pl-4 sm:pl-6 mb-3">{children}</ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="list-decimal pl-4 sm:pl-6 mb-3">{children}</ol>
                                ),
                                table: ({ children }) => (
                                    <div className="overflow-x-auto my-4">
                                        <table className="w-full border-collapse border border-gray-300 min-w-[500px] sm:min-w-0">
                                            {children}
                                        </table>
                                    </div>
                                ),
                                th: ({ children }) => (
                                    <th className="border border-gray-300 px-2 sm:px-4 py-2 bg-gray-100 text-left text-xs sm:text-sm">
                                        {children}
                                    </th>
                                ),
                                td: ({ children }) => (
                                    <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                                        {children}
                                    </td>
                                ),
                                code: ({ children }) => (
                                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs sm:text-sm break-all">
                                        {children}
                                    </code>
                                ),
                                pre: ({ children }) => (
                                    <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto text-xs sm:text-sm my-4">
                                        {children}
                                    </pre>
                                ),
                            }}
                        >
                            {result?.chat?.response}
                        </ReactMarkdown>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full min-h-[30vh] sm:min-h-[20vh] text-center opacity-50 px-4">
                        <div className="mb-3 scale-75 sm:scale-100">{icon1}</div>
                        <p className="text-sm text-gray-500 max-w-[250px]">{description}</p>
                    </div>
                )}
            </div> 
            }
        </div>
    );
}

export default Output;