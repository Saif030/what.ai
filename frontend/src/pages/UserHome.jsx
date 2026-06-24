import { useUser } from '@clerk/react'
import { useContext } from 'react';
import { UserDataContext } from '../DataContex/UserData.jsx';

function UserHome() {
    const {credits,billingData,chatData,getSpecificChatData} = useContext(UserDataContext)
    const data = [
            {
                prompt:"write article on topic india gdp continuos growth",
                date:"12/05/2025",
                type:"Article"
            },
            {
                prompt:"write article on topic india gdp continuos growth",
                date:"12/05/2025",
                type:"Article"
            },
            {
                prompt:"write article on topic india gdp continuos growth",
                date:"12/05/2025",
                type:"Article"
            },
            {
                prompt:"write article on topic india gdp continuos growth",
                date:"12/05/2025",
                type:"Article"
            },
            {
                prompt:"write article on topic india gdp continuos growth",
                date:"12/05/2025",
                type:"Article"
            },
    ]
    const {user} = useUser()
    const todayDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    return (
        <div className="flex flex-col px-6 w-full">
            <div className="flex flex-col gap-2 p-4">
                <h1 className='text-3xl font-semibold'>Welcome Back , <span className='text-blue-500'>{user?.fullName}</span></h1>
                <p className='text-sm text-gray-500'>{todayDate}</p>
            </div>
            <div className="w-full p-4 flex gap-8 items-center justify-start">
                <div className="h-[8vw] px-8 flex items-center justify-between w-[20vw] bg-white rounded-xl shadow-lg p-4">
                    <div>
                        <p className="text-lg">Total Credits:</p>
                        <p className="text-2xl font-semibold">{credits?.credits}</p>
                    </div>
                    <div>
                        <img className="w-28 h-28 object-cover" src="https://thumbs.dreamstime.com/b/credits-coin-money-color-icon-element-color-finance-signs-premium-quality-graphic-design-icon-signs-symbols-collection-138406669.jpg" alt="" />
                    </div>
                </div>
                <div className="h-[8vw] px-8 flex items-center justify-between w-[20vw] bg-white rounded-xl shadow-lg p-4">
                    <div>
                        <p className="text-lg">Plan Status:</p>
                        <p className="text-2xl font-semibold">{billingData?.billingData?.slug}</p>
                    </div>
                    <div>
                        <img className="w-28 h-28 object-cover" src="data:image/jpeg;base64,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" alt="" />
                    </div>
                </div>
                <div className="h-[8vw] px-8 flex items-center justify-between w-[20vw] bg-white rounded-xl shadow-lg p-4">
                    <div>
                        <p className="text-lg">Total Creations:</p>
                        <p className="text-2xl font-semibold">{chatData?.chats?.length}</p>
                    </div>
                    <div>
                        <img className="w-28 h-28 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdSj03Fjjt5KdJ-IqusbKx6X-tzFrUO3Rqokp1BDjJ70Xbmb_YNe5zYUCc&s=10" alt='total creation' />
                    </div>
                </div>
            </div>
            
            <div className="w-full h-[66vh] p-4 flex flex-col gap-4">
            <h1 className="text-3xl font-semibold text-gray-500">Recent Creations</h1>
            
            {/* Table Container: flex-1 flex flex-col min-h-0 is critical */}
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white flex-1 flex flex-col min-h-0">
                
                {/* Table Header */}
                <div className="grid grid-cols-12 px-6 py-4 bg-gray-50 border-b text-sm font-semibold text-gray-600 shrink-0">
                <div className="col-span-6">Title</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2 text-center">Action</div>
                </div>

                {/* Table Body: flex-1 overflow-y-auto instead of max-h-[450px] */}
                <div className="flex-1 overflow-y-auto min-h-0">
                {chatData?.chats?.map((item, index) => (
                    <div
                    key={item?.id || index}  // Use a unique ID if available
                    className="grid grid-cols-12 items-center px-6 py-5 border-b last:border-b-0 hover:bg-gray-50 transition"
                    >
                    {/* Title */}
                    <div className="col-span-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                        📄
                        </div>
                        <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                            {item?.query?.slice(0, 55)}
                        </h3>
                        <p className="text-sm text-gray-500">{item?.response?.slice(0, 55)}</p>
                        </div>
                    </div>

                    {/* Date */}
                    <div className="col-span-2 text-gray-600 text-sm">
                        {new Date(item?.createdAt).toLocaleDateString()}
                    </div>

                    {/* Category */}
                    <div className="col-span-2">
                        <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
                        ${item?.category === "article"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                        >
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                            <path d="M9.4 1H13v3.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13 1 7.9 6.1l-3-3L1 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item?.category}
                        </span>
                    </div>

                    {/* Action */}
                    <div className="col-span-2 flex justify-center">
                        <button onClick={() => getSpecificChatData(item?._id)} className="w-10 h-10 rounded-full border border-gray-200 hover:bg-gray-100 flex items-center justify-center transition">
                        →
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>
    )
}   

export default UserHome