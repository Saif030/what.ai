import { RotateCcw } from "lucide-react";

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
            <div className="mt-6 flex-1 max-h-[60vh] overflow-y-auto pr-2">
                
                {/* Conditional Rendering: Show result OR placeholder */}
                {result ? (
                    <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                        {/* whitespace-pre-wrap ensures line breaks from the AI are preserved */}
                        {result} 
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