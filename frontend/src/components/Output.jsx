import { RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// 1. Added 'result' to the props. 
// 2. Changed 'resultColor' to 'textClass' and 'btnClass' to fix Tailwind dynamic class issues.
function Output({ title, icon1, description, result, textClass = "text-blue-500", btnClass = "bg-blue-500 hover:bg-blue-600" }) {
    return (
        // 3. Made responsive: w-full on mobile, w-[35vw] on large screens
        <div className="w-full lg:w-[35vw] p-6 lg:p-10 bg-white shadow-lg rounded-2xl flex flex-col">
            
            {/* Header Section */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
                <h1 className={`text-xl lg:text-2xl ${textClass} font-bold flex items-center gap-2`}>
                    {icon1}
                    {title}
                </h1>
                <button className={`${btnClass} text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2 text-sm whitespace-nowrap transition-colors`}>
                    <RotateCcw size={16} /> Regenerate
                </button>
            </div>

            {/* Body Content Area */}
            {/* 4. Removed absolute positioning. Added max-height and overflow-y-auto so long articles scroll safely inside the card */}
            <div className="mt-6 flex-1 max-h-[72vh] overflow-y-auto pr-2">
                
                {/* Conditional Rendering: Show result OR placeholder */}
                {result ? (
                    <div className="text-gray-700 text-sm leading-relaxed">
                        {/* whitespace-pre-wrap ensures line breaks from the AI are preserved */}
                        <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ children }) => (
                            <p className="mb-2 leading-7">{children}</p>
                            ),
                            h1: ({ children }) => (
                            <h1 className="text-3xl font-bold mb-4">{children}</h1>
                            ),
                            h2: ({ children }) => (
                            <h2 className="text-2xl font-semibold mb-3 mt-5">{children}</h2>
                            ),
                            h3: ({ children }) => (
                            <h3 className="text-xl font-semibold mb-2 mt-4">{children}</h3>
                            ),
                            ul: ({ children }) => (
                            <ul className="list-disc pl-6 mb-3">{children}</ul>
                            ),
                            ol: ({ children }) => (
                            <ol className="list-decimal pl-6 mb-3">{children}</ol>
                            ),
                            table: ({ children }) => (
                            <div className="overflow-x-auto my-4">
                                <table className="w-full border-collapse border border-gray-300">
                                {children}
                                </table>
                            </div>
                            ),
                            th: ({ children }) => (
                            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">
                                {children}
                            </th>
                            ),
                            td: ({ children }) => (
                            <td className="border border-gray-300 px-4 py-2">
                                {children}
                            </td>
                            ),
                        }}
                        >{result?.data?.choices[0]?.message?.content}</ReactMarkdown>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full min-h-[20vh] text-center opacity-50">
                        <div className="mb-3">{icon1}</div>
                        <p className="text-sm text-gray-500 max-w-[250px]">{description}</p>
                    </div>
                )}
                
            </div>
        </div>
    );
}

export default Output;