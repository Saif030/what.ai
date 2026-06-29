import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar, { SidebarItem } from "../components/SideBar.jsx";
import { Home, Menu, ImageOff, CodeXml } from "lucide-react";
import { RiAiGenerateText } from "react-icons/ri";
import { FaHashtag, FaImage } from "react-icons/fa";
import { TbBackground } from "react-icons/tb";
import { IoIosDocument } from "react-icons/io";
import { logo } from '../assets/assets.js';

function UserLayout() {
    const location = useLocation();
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close mobile sidebar on route change
    useEffect(() => {
        setIsMobileSidebarOpen(false);
    }, [location.pathname]);

    const routes = [
        { icon: <Home size={20} />, text: "Home", route: "/whatai/userHome" },
        { icon: <RiAiGenerateText size={20} />, text: "Article Writer", route: "/whatai/articleWriter" },
        { icon: <ImageOff size={20} />, text: "Object Removal", route: "/whatai/objectRemoval" },
        { icon: <FaHashtag size={20} />, text: "Blog Title Generator", route: "/whatai/blogTitleGenerator" },
        // { icon: <FaImage size={20} />, text: "Image Generation", route: "/whatai/imageGeneration" },
        { icon: <TbBackground size={20} />, text: "Background Removal", route: "/whatai/backgroundRemoval" },
        { icon: <IoIosDocument size={20} />, text: "Resume Analyzer", route: "/whatai/resumeAnalyzer" },
        { icon: <CodeXml size={20} />, text: "Code Generation", route: "/whatai/codeGeneration" }
    ];

    const currentRoute = location.pathname;

    return (
        <div className="min-h-screen w-full flex bg-gradient-to-br from-green-50 via-red-50 via-blue-50 to-indigo-100 relative">
            
            {/* Mobile Header */}
            {isMobile && (
                <header className="fixed top-0 left-0 right-0 h-14 bg-white/90 backdrop-blur-md border-b border-gray-200 z-30 flex items-center justify-between px-4 shadow-sm">
                    <button
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition active:scale-95"
                        aria-label="Open menu"
                    >
                        <Menu size={24} />
                    </button>
                    <a href="https://what-ai-t53p.vercel.app">
                      <img className="h-14 sm:h-18 lg:h-20 cursor-pointer" src={logo} alt="logo" />
                    </a>    
                    <div className="w-10" />
                </header>
            )}

            {/* Sidebar */}
            <SideBar 
                isMobileOpen={isMobileSidebarOpen} 
                onMobileClose={() => setIsMobileSidebarOpen(false)}
            >
                {routes.map((item, index) => (
                    <Link to={item.route} key={index} className="block">
                        <SidebarItem 
                            icon={item.icon} 
                            text={item.text} 
                            active={item.route === currentRoute}
                        />
                    </Link>
                ))}
            </SideBar>

            {/* Main Content */}
            <main className={`flex-1 min-h-screen w-full ${isMobile ? 'pt-10' : ''}`}>
                <div className="p-4 sm:p-6 lg:p-1 w-full min-h-screen">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default UserLayout;