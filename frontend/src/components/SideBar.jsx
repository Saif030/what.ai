import { ChevronFirst, ChevronLast, LogOut, X } from "lucide-react"
import { createContext, useContext, useState, useEffect } from "react"
import { useUser, useClerk } from "@clerk/react";
import { logo } from "../assets/assets.js"
import { useNavigate } from "react-router-dom"

const SidebarContext = createContext();

export default function SideBar({ children, isMobileOpen, onMobileClose }) {
    const { user } = useUser();
    const { openUserProfile, signOut } = useClerk();
    const [expanded, setExpanded] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    const navigate = useNavigate()

    // Detect mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024
            setIsMobile(mobile)
            // On mobile, start collapsed. On desktop, respect user preference.
            if (mobile && expanded) {
                setExpanded(false)
            }
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const toggleExpand = () => setExpanded(curr => !curr)

    return (
        <>
            {/* Mobile: Render as overlay drawer */}
            {isMobile ? (
                <>
                    {/* Backdrop */}
                    {isMobileOpen && (
                        <div 
                            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
                            onClick={onMobileClose}
                        />
                    )}
                    
                    {/* Mobile Drawer */}
                    <aside 
                        className={`
                            fixed top-0 left-0 h-screen z-50
                            transform transition-transform duration-300 ease-out
                            ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
                        `}
                    >
                        <nav className="h-full flex flex-col bg-white border-r shadow-xl w-64">
                            {/* Mobile Header with Close */}
                            <div className="p-4 pb-2 flex justify-between items-center border-b border-gray-100">
                                <img 
                                    onClick={() => { navigate("/"); onMobileClose?.(); }} 
                                    alt="what.ai" 
                                    src={logo} 
                                    className="w-32 h-8 object-contain cursor-pointer" 
                                />
                                <button 
                                    onClick={onMobileClose}
                                    className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <SidebarContext.Provider value={{ expanded: true }}>
                                <ul className="flex-1 px-3 py-2 overflow-y-auto">
                                    {children}
                                </ul>
                            </SidebarContext.Provider>

                            {/* Mobile User Profile */}
                            <div className="border-t flex p-3 items-center gap-3">
                                <img 
                                    onClick={() => openUserProfile()} 
                                    src={user?.imageUrl || ""} 
                                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                                    alt="profile"
                                />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm truncate">{user?.fullName}</h4>
                                    <span className="text-xs text-gray-600 truncate block">
                                        {user?.emailAddresses?.[0]?.emailAddress}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => signOut()} 
                                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </nav>
                    </aside>
                </>
            ) : (
                /* Desktop: Render as sidebar with collapse functionality */
                <aside className="h-screen sticky top-0">
                    <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                        <div className="p-4 pb-2 flex justify-between items-center">
                            <img 
                                onClick={() => navigate("/")} 
                                alt="what.ai" 
                                src={logo} 
                                className={`overflow-hidden cursor-pointer object-contain transition-all duration-300 ${expanded ? "w-32" : "w-0"}`} 
                            />
                            <button 
                                onClick={toggleExpand} 
                                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                            >
                                {expanded ? <ChevronFirst /> : <ChevronLast />}
                            </button>
                        </div>

                        <SidebarContext.Provider value={{ expanded }}>
                            <ul className="flex-1 px-3 overflow-y-auto overflow-x-hidden">
                                {children}
                            </ul>
                        </SidebarContext.Provider>

                        {/* Desktop User Profile */}
                        <div className="border-t flex p-3 cursor-pointer hover:bg-gray-50 transition">
                            <img 
                                onClick={() => openUserProfile()} 
                                src={user?.imageUrl || ""} 
                                className="w-8 h-8 rounded-full object-cover"
                                alt="profile"
                            />
                            <div 
                                onClick={() => openUserProfile()} 
                                className={`flex justify-between items-center overflow-hidden transition-all duration-300 ${expanded ? "w-52 ml-3" : "w-0"}`}
                            >
                                <div className="leading-4 min-w-0">
                                    <h4 className="font-semibold text-sm truncate">{user?.fullName}</h4>
                                    <span className="text-xs text-gray-600 truncate block">
                                        {user?.emailAddresses?.[0]?.emailAddress}
                                    </span>
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); signOut(); }}
                                    className="p-1 hover:bg-gray-200 rounded transition"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </div>
                    </nav>
                </aside>
            )}
        </>
    )
}

export function SidebarItem({ icon, text, active, alert, onClick }) {
    const { expanded } = useContext(SidebarContext)
    
    return (
        <li 
            onClick={onClick}
            className={`
                relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-all group
                ${active 
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" 
                    : "hover:bg-indigo-50 text-gray-600"
                }
            `}
        >
            <span className="flex-shrink-0">{icon}</span>
            
            <span className={`
                overflow-hidden whitespace-nowrap transition-all duration-300
                ${expanded ? "w-52 ml-3 opacity-100" : "w-0 ml-0 opacity-0"}
            `}>
                {text}
            </span>
            
            {alert && (
                <div className={`
                    absolute w-2 h-2 rounded-full bg-indigo-400
                    ${expanded ? "right-2" : "top-2 right-2"}
                `} />
            )}

            {/* Tooltip for collapsed state */}
            {!expanded && (
                <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50 whitespace-nowrap">
                    {text}
                </div>
            )}
        </li>
    )
}