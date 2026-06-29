import { RotateCcw, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { v4 as uuidv4 } from 'uuid';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Output({ title, icon1, description, result, textClass = "text-blue-500", btnClass = "bg-blue-500 hover:bg-blue-600" , isLoading=false }) {
   const response = typeof result === "string" ? result : result?.chat?.response;
   const isImage = typeof result === "object" && result?.chat?.isImage;

    return (
        <div className="w-full lg:w-[35vw] p-2 sm:p-4 lg:p-6 bg-white shadow-lg rounded-2xl flex flex-col max-h-[90vh] lg:max-h-[85vh]">
            
            {/* Header Section */}
            <div className="w-full flex sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pb-4 border-b border-gray-200">
                <h1 className={`text-lg sm:text-xl lg:text-2xl ${textClass} font-bold flex items-center gap-2`}>
                    {icon1}
                    <span className="truncate">{title}</span>
                </h1>
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
                {response ? (
                    isImage ? (
                        <div className="w-full h-auto sm:h-[70vh] flex flex-col items-center justify-center gap-4">
                            <img
                                src={response}
                                className="w-full max-h-[50vh] sm:h-[65vh] object-contain rounded-lg"
                                alt="Generated content"
                            />

                            <a
                                href={response}
                                download={`whatai-${uuidv4()}.jpg`}
                                className="w-full sm:w-auto"
                            >
                                <button
                                    className={`${btnClass} w-full sm:w-auto text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors`}
                                    type="button"
                                >
                                    <Download size={16} />
                                    <span className="hidden sm:inline">Save Image</span>
                                    <span className="sm:hidden">Save</span>
                                </button>
                            </a>
                        </div>
                    ) : (
                    <div className="text-black p-4 text-sm leading-relaxed">
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p: ({ children }) => (
                                    <p className="mb-2 sm:mb-3 leading-6 sm:leading-7 text-gray-800">{children}</p>
                                ),
                                h1: ({ children }) => (
                                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-gray-900">{children}</h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 mt-4 sm:mt-5 text-gray-900">{children}</h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 mt-3 sm:mt-4 text-gray-900">{children}</h3>
                                ),
                                ul: ({ children }) => (
                                    <ul className="list-disc pl-4 sm:pl-6 mb-2 sm:mb-3 text-gray-800">{children}</ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="list-decimal pl-4 sm:pl-6 mb-2 sm:mb-3 text-gray-800">{children}</ol>
                                ),
                                li: ({ children }) => (
                                    <li className="mb-1 text-gray-800">{children}</li>
                                ),
                                table: ({ children }) => (
                                    <div className="overflow-x-auto my-3 sm:my-4 -mx-2 sm:mx-0">
                                        <table className="w-full border-collapse border border-gray-300 min-w-[300px]">
                                            {children}
                                        </table>
                                    </div>
                                ),
                                th: ({ children }) => (
                                    <th className="border border-gray-300 px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-50 text-left text-xs sm:text-sm text-gray-900 font-semibold">
                                        {children}
                                    </th>
                                ),
                                td: ({ children }) => (
                                    <td className="border border-gray-300 px-2 sm:px-4 py-1.5 sm:py-2 bg-transparent text-xs sm:text-sm text-gray-800">
                                        {children}  
                                    </td>
                                ),
                                code: ({ children, inline }) => (
                                    inline 
                                        ? <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-[10px] sm:text-xs break-all">{children}</code>
                                        : <pre className="bg-gray-100 text-gray-800 text-wrap p-2 sm:p-3 rounded-lg overflow-x-auto my-2 sm:my-3 text-[10px] sm:text-xs"><code>{children}</code></pre>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-gray-400 pl-3 sm:pl-4 italic my-2 sm:my-3 text-gray-600 text-xs sm:text-sm">
                                        {children}
                                    </blockquote>
                                ),
                                a: ({ children, href }) => (
                                    <a 
                                        href={href} 
                                        className="text-blue-600 hover:underline hover:text-blue-800 break-all" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        {children}
                                    </a>
                                ),
                                hr: () => (
                                    <hr className="border-gray-300 my-3 sm:my-4" />
                                ),
                                strong: ({ children }) => (
                                    <strong className="font-semibold text-gray-900">{children}</strong>
                                ),
                                em: ({ children }) => (
                                    <em className="italic text-gray-700">{children}</em>
                                ),
                            }}
                            >
                                {response}
                        </ReactMarkdown>
                    </div>
                    )
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-50 px-4">
                        <div className="mb-3">{icon1}</div>
                        <p className="text-sm text-gray-500">{description}</p>
                    </div>
                )}
            </div> 
            }
        </div>
    );
}

export default Output;