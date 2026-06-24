import { useUser } from '@clerk/react';
import { useContext, useState } from 'react';
import { UserDataContext } from '../DataContex/UserData.jsx';
import ChatShow from '../components/ChatShow.jsx';

function UserHome() {
    const { credits, billingData, chatData, getSpecificChatData, specificChat } = useContext(UserDataContext);
    
    const [isBoxShow, setIsBoxShow] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);

    const viewChat = async (chatId) => {
        if (!chatId) return;
        try {
            const chat = await getSpecificChatData(chatId);
            setSelectedChat(chat);
            setIsBoxShow(true);
        } catch (error) {
            console.error('Failed to load chat:', error);
        }
    };

    const { user, isLoaded } = useUser();
    
    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const todayDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="flex relative flex-col px-4 sm:px-6 w-full min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="flex flex-col gap-2 p-4">
                <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold'>
                    Welcome Back, <span className='text-blue-500'>{user?.fullName || 'User'}</span>
                </h1>
                <p className='text-xs sm:text-sm text-gray-500'>{todayDate}</p>
            </div>

            {/* Stats Cards - Responsive Grid */}
            <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                {/* Credits Card */}
                <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <div className="flex-1">
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600">Total Credits:</p>
                        <p className="text-xl sm:text-2xl font-semibold">{credits?.credits ?? 0}</p>
                    </div>
                    <div className="flex-shrink-0">
                        <img 
                            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 object-cover" 
                            src="https://thumbs.dreamstime.com/b/credits-coin-money-color-icon-element-color-finance-signs-premium-quality-graphic-design-icon-signs-symbols-collection-138406669.jpg" 
                            alt="Credits" 
                        />
                    </div>
                </div>

                {/* Plan Status Card */}
                <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <div className="flex-1">
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600">Plan Status:</p>
                        <p className="text-xl sm:text-2xl font-semibold">{billingData?.billingData?.slug ?? 'Free'}</p>
                    </div>
                    <div className="flex-shrink-0">
                        <img 
                            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 object-cover" 
                            src="https://cdn-icons-png.flaticon.com/512/1078/1078011.png" 
                            alt="Plan Status" 
                        />
                    </div>
                </div>

                {/* Total Creations Card */}
                <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
                    <div className="flex-1">
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600">Total Creations:</p>
                        <p className="text-xl sm:text-2xl font-semibold">{chatData?.chats?.length ?? 0}</p>
                    </div>
                    <div className="flex-shrink-0">
                        <img 
                            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 object-cover" 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdSj03Fjjt5KdJ-IqusbKx6X-tzFrUO3Rqokp1BDjJ70Xbmb_YNe5zYUCc&s=10" 
                            alt="Total Creations" 
                        />
                    </div>
                </div>
            </div>

            {/* Recent Creations Section */}
            <div className="w-full flex-1 p-4 flex flex-col gap-4 min-h-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-500">Recent Creations</h1>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white flex-1 flex flex-col min-h-0 shadow-sm">
                    {/* Table Header - Hidden on mobile, visible on sm+ */}
                    <div className="hidden sm:grid grid-cols-12 px-4 lg:px-6 py-3 lg:py-4 bg-gray-50 border-b text-xs lg:text-sm font-semibold text-gray-600 shrink-0">
                        <div className="col-span-5 lg:col-span-6">Title</div>
                        <div className="col-span-3 lg:col-span-2">Date</div>
                        <div className="col-span-2 lg:col-span-2">Type</div>
                        <div className="col-span-2 text-center">Action</div>
                    </div>

                    {/* Mobile Header */}
                    <div className="sm:hidden px-4 py-3 bg-gray-50 border-b text-sm font-semibold text-gray-600">
                        Recent Creations
                    </div>

                    {/* Table Body */}
                    <div className="flex-1 overflow-y-auto min-h-0">
                        {chatData?.chats?.length > 0 ? (
                            chatData.chats.map((item) => (
                                <div
                                    key={item?._id || item?.id}
                                    className="grid grid-cols-1 sm:grid-cols-12 items-center px-4 lg:px-6 py-4 lg:py-5 border-b last:border-b-0 hover:bg-gray-50 transition gap-2 sm:gap-0"
                                >
                                    {/* Title & Preview - Full width on mobile */}
                                    <div className="sm:col-span-5 lg:col-span-6 flex items-center gap-3 lg:gap-4">
                                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0 text-lg">
                                            📄
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-semibold text-gray-900 text-sm lg:text-base truncate">
                                                {item?.query?.slice(0, 55)}
                                            </h3>
                                            <p className="text-xs lg:text-sm text-gray-500 truncate">
                                                {item?.response?.slice(0, 55)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Date - Hidden label on mobile */}
                                    <div className="sm:col-span-3 lg:col-span-2 text-gray-600 text-xs lg:text-sm flex sm:block items-center gap-2">
                                        <span className="sm:hidden font-medium text-gray-500">Date:</span>
                                        {item?.createdAt 
                                            ? new Date(item.createdAt).toLocaleDateString() 
                                            : 'N/A'
                                        }
                                    </div>

                                    {/* Category - Hidden label on mobile */}
                                    <div className="sm:col-span-2 lg:col-span-2 flex sm:block items-center gap-2">
                                        <span className="sm:hidden font-medium text-gray-500 text-xs">Type:</span>
                                        <span
                                            className={`inline-flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium
                                                ${item?.category === "article"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-emerald-100 text-emerald-700"
                                                }`}
                                        >
                                            <svg width="12" height="7" className="lg:w-[14px] lg:h-[8px]" viewBox="0 0 14 8" fill="none">
                                                <path d="M9.4 1H13v3.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M13 1 7.9 6.1l-3-3L1 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            {item?.category || 'Unknown'}
                                        </span>
                                    </div>

                                    {/* Action */}
                                    <div className="sm:col-span-2 flex justify-end sm:justify-center mt-2 sm:mt-0">
                                        <button 
                                            onClick={() => viewChat(item?._id || item?.id)} 
                                            className="w-9 h-9 lg:w-10 lg:h-10 rounded-full cursor-pointer border border-gray-200 hover:bg-gray-100 flex items-center justify-center transition active:scale-95"
                                            aria-label="View chat"
                                            type="button"
                                        >
                                            <span className="text-sm lg:text-base">→</span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-32 sm:h-48 text-gray-400 text-sm sm:text-base">
                                No creations yet
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Chat Modal - Responsive sizing */}
            {isBoxShow && (
                <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>
                    <div className='w-full sm:w-[80vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] h-[85vh] sm:h-[80vh] relative'>
                        <ChatShow 
                            setisBoxShow={setIsBoxShow} 
                            chat={selectedChat}
                            specificChat={specificChat}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserHome;