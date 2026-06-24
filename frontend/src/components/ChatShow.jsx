import { useContext } from 'react';
import { UserDataContext } from '../DataContex/UserData.jsx';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { X } from 'lucide-react';
import CopyButton from './CopyButton';

const ChatShow = ({ setisBoxShow, chat, specificChat }) => {
    const chatData = chat || specificChat;

    if (!chatData) {
        return (
            <div className='h-full w-full relative bg-black/80 text-white rounded-xl p-4 sm:p-6 flex items-center justify-center'>
                <div className="animate-pulse text-gray-400 text-sm sm:text-base">Loading chat...</div>
            </div>
        );
    }

    const chatItem = chatData?.chat?.[0] || chatData;

    const formattedDate = chatItem?.createdAt 
        ? new Date(chatItem.createdAt).toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : 'Unknown date';

    return (
        <div className='h-full w-full relative bg-black/80 text-white rounded-xl p-4 sm:p-6 lg:p-8 overflow-y-auto'>
            {/* Close Button - Larger touch target on mobile */}
            <button 
                onClick={() => setisBoxShow(false)} 
                className='p-2.5 sm:p-2 text-sm bg-red-500/70 rounded-full cursor-pointer absolute right-2 sm:right-3 top-2 sm:top-3 hover:bg-red-500 transition active:scale-90 z-10'
                aria-label="Close chat"
                type="button"
            >
                <X size={18} className="sm:w-4 sm:h-4"/>
            </button>

            {/* Header */}
            <div className="border-b border-gray-700 pb-3 sm:pb-4 mb-4 sm:mb-6 pr-10">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                        chatItem?.category === 'article' 
                            ? 'bg-blue-600' 
                            : 'bg-emerald-600'
                    }`}>
                        {chatItem?.category?.toUpperCase() || 'UNKNOWN'}
                    </span>
                </div>
                <h1 className="text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 break-words leading-relaxed">
                    {chatItem?.query || 'No query available'}
                </h1>
                <p className="text-[10px] sm:text-xs text-gray-200">{formattedDate}</p>
            </div>

            {/* Response Content */}
            {chatItem?.isImage ? (
                <div className="w-full flex flex-col items-center justify-center">
                    <img 
                        src={chatItem?.response}  
                        className="w-full max-h-[50vh] sm:max-h-[55vh] object-contain rounded-lg" 
                        alt="Generated content" 
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                            e.target.alt = 'Failed to load image';
                        }}
                    />
                </div>
            ) : (
                <div className="text-white relative text-xs sm:text-sm leading-relaxed">
                    {/* Copy Button - Responsive positioning */}
                    <div className="absolute -top-6 sm:-top-7 right-0 sm:-right-5 p-1.5 sm:p-2">
                        <CopyButton textToCopy={chatItem?.response || ''} />
                    </div>
                    
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ children }) => (
                                <p className="mb-2 sm:mb-3 leading-6 sm:leading-7">{children}</p>
                            ),
                            h1: ({ children }) => (
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">{children}</h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 mt-4 sm:mt-5">{children}</h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 mt-3 sm:mt-4">{children}</h3>
                            ),
                            ul: ({ children }) => (
                                <ul className="list-disc pl-4 sm:pl-6 mb-2 sm:mb-3">{children}</ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal pl-4 sm:pl-6 mb-2 sm:mb-3">{children}</ol>
                            ),
                            li: ({ children }) => (
                                <li className="mb-1">{children}</li>
                            ),
                            table: ({ children }) => (
                                <div className="overflow-x-auto my-3 sm:my-4 -mx-2 sm:mx-0">
                                    <table className="w-full border-collapse border border-white min-w-[300px]">
                                        {children}
                                    </table>
                                </div>
                            ),
                            th: ({ children }) => (
                                <th className="border border-white px-2 sm:px-4 py-1.5 sm:py-2 bg-transparent text-left text-xs sm:text-sm">
                                    {children}
                                </th>
                            ),
                            td: ({ children }) => (
                                <td className="border border-white px-2 sm:px-4 py-1.5 sm:py-2 bg-transparent text-xs sm:text-sm">
                                    {children}  
                                </td>
                            ),
                            code: ({ children, inline }) => (
                                inline 
                                    ? <code className="bg-gray-700 px-1 py-0.5 rounded text-[10px] sm:text-xs break-all">{children}</code>
                                    : <pre className="bg-gray-800 p-2 sm:p-3 rounded-lg overflow-x-auto my-2 sm:my-3 text-[10px] sm:text-xs"><code>{children}</code></pre>
                            ),
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-gray-500 pl-3 sm:pl-4 italic my-2 sm:my-3 text-gray-300 text-xs sm:text-sm">
                                    {children}
                                </blockquote>
                            ),
                            a: ({ children, href }) => (
                                <a 
                                    href={href} 
                                    className="text-blue-400 hover:underline break-all" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    {children}
                                </a>
                            ),
                            hr: () => (
                                <hr className="border-gray-600 my-3 sm:my-4" />
                            ),
                            strong: ({ children }) => (
                                <strong className="font-semibold text-white">{children}</strong>
                            ),
                            em: ({ children }) => (
                                <em className="italic text-gray-200">{children}</em>
                            ),
                        }}
                    >
                        {chatItem?.response || 'No response available'}
                    </ReactMarkdown>
                </div>
            )}

            {/* Footer */}
            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-white/30 text-[10px] sm:text-xs text-gray-300">
                <p>Chat ID: {chatItem?._id || 'N/A'}</p>
            </div>
        </div>
    );
};

export default ChatShow;