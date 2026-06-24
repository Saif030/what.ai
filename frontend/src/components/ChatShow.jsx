import { useContext } from 'react';
import { UserDataContext } from '../DataContex/UserData.jsx';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { X } from 'lucide-react';
import CopyButton from './CopyButton';

const ChatShow = ({setisBoxShow}) => {
    const { specificChat } = useContext(UserDataContext);
    // Handle loading state
    if (!specificChat) {
        return
    }

    // Format date
    const formattedDate = specificChat?.chat[0]?.createdAt 
        ? new Date(specificChat?.chat[0]?.createdAt).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : 'Unknown date';

    return (
        <div className='h-full w-full relative bg-black/80 text-white rounded-xl p-6 overflow-y-auto'>
            <span onClick={() => setisBoxShow(false)} className='p-2 text-sm bg-red-500/70 rounded-full cursor-pointer absolute right-3 top-3'><X size={16}/></span>
            {/* Header */}
            <div className="border-b border-gray-700 pb-4 mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        specificChat?.category === 'article' 
                            ? 'bg-blue-600' 
                            : 'bg-emerald-600'
                    }`}>
                        {specificChat?.chat[0]?.category?.toUpperCase()}
                    </span>
                </div>
                <h1 className="text-sm font-bold mb-2 break-words">query : {specificChat?.chat[0]?.query}</h1>
                <p className="text-sm text-gray-400">{formattedDate}</p>
            </div>

            {/* Response Content */}
            {specificChat?.chat[0]?.category === 'object-remover' ? (
                   <div className="w-full h-[55vh] flex flex-col items-center justify-center">
                     <img src={specificChat?.chat[0]?.response}  className="w-full h-[55vh] object-contain rounded-lg mt-2" alt="image not loaded" />
                   </div>
                )  : (
                    <div className="text-white relative text-sm leading-relaxed">
                        <div className="absolute -top-6 -right-5 p-2">
                            <CopyButton textToCopy={specificChat?.chat[0]?.response} />
                        </div>
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
                                <table className="w-full border-collapse border border-white">
                                {children}
                                </table>
                            </div>
                            ),
                            th: ({ children }) => (
                            <th className="border border-white px-4 py-2 bg-transparent text-left">
                                {children}
                            </th>
                            ),
                            td: ({ children }) => (
                            <td className="border border-white px-4 py-2 bg-transparent">
                                {children}  
                            </td>
                            ),
                        }}
                        >{specificChat?.chat[0]?.response}</ReactMarkdown>
                    </div>
                )}

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-white text-xs text-white">
                <p>Chat ID: {specificChat?.chat[0]?._id}</p>
            </div>
        </div>
    );
};

export default ChatShow;