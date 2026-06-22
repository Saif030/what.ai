import { Outlet, Link , useLocation } from "react-router-dom";
import SideBar , {SidebarItem} from "../components/SideBar.jsx";
import { Home, LayoutDashboard, StickyNote, Calendar, Layers, Flag } from "lucide-react";
import { RiAiGenerateText } from "react-icons/ri";
import { ImageOff } from "lucide-react";
import { FaHashtag } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { TbBackground } from "react-icons/tb";
import { IoIosDocument } from "react-icons/io";

function UserLayout() {
    const location = useLocation();
    const rout = [
        {
            icon: <Home size={20} />,
            text: "Home",
            alert: false,
            route: "/whatai/userHome"
        },
        {
            icon: <RiAiGenerateText size={20} />,
            text: "Article Writer",
            alert: false,
            route: "/whatai/articleWriter"
        },
        {
            icon: <ImageOff size={20} />,
            text: "Object Removal",
            alert: false,
            route: "/whatai/objectRemoval"
        },
        {
            icon: <FaHashtag size={20} />,
            text: "Blog Title Generator",
            alert: false,
            route: "/whatai/blogTitleGenerator"
        },
        {
            icon: <FaImage size={20} />,
            text: "Image Generation",
            alert: false,
            route: "/whatai/imageGeneration"
        },
        {
            icon: <TbBackground size={20} />,
            text: "Background Removal",
            alert: false,
            route: "/whatai/backgroundRemoval"
        },
        {
            icon: <IoIosDocument size={20} />,
            text: "Resume Analyzer",
            alert: false,
            route: "/whatai/resumeAnalyzer"
        }
    ]

    const currentRoute = location.pathname;

    return (
        <div  className="min-h-screen w-full flex bg-gradient-to-br from-green-50 via-red-50 via-blue-50 to-indigo-100">
            <div className="flex">
                <SideBar>
                    {rout.map((item, index) => (
                        <Link to={item.route} key={index}>
                            <SidebarItem icon={item.icon} text={item.text} alert={item.alert} active={item.route === currentRoute} />
                        </Link>
                    ))}
                </SideBar>
            </div>
            <Outlet />
        </div>
    )
}

export default UserLayout;