import ShinyText from './ShinyText';
import { TbWriting } from "react-icons/tb";
import { FaPhotoVideo } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { TbBackground } from "react-icons/tb";
import { MdOutlineSubtitles } from "react-icons/md";
import { FaScissors } from "react-icons/fa6";

function Features() {
const features = [
    {
        title: "AI Article Writer",
        icon: <TbWriting size={26}/>,
        description: "Generate high-quality, engaging articles on any topic with our AI writing technology."
    },
    {
        title:"AI Object Removal",
        icon:<FaScissors size={26}/>,
        description:"Effortlessly remove objects from your images with our AI-driven tool."
    },
    {
        title: "Blog Title Generator",
        icon: <MdOutlineSubtitles size={26} />,
        description: "Find the perfect, catchy title for your blog posts with our AI-powered generator."
    },
    {
        title: "AI Image Generation",
        icon: <FaPhotoVideo size={26} />,
        description: "Create stunning visuals with our AI image generation tool, Experience the power of AI."
    },
    {
        title: "Background Removal",
        icon: <TbBackground size={26} />,
        description: "Effortlessly remove backgrounds from your images with our AI-driven tool."
    },
    {
        title: "AI Video Generation",
        icon: <MdOutlineOndemandVideo size={26} />,
        description: "Create stunning videos with our AI video generation tool, Experience the power of AI."
    }
]

    return (
        <div
         className="w-full relative py-4 px-6 flex gap-4 min-h-[100vh] justify-center items-center">
            <div className="flex flex-col gap-2 justify-center items-center">
                <ShinyText
                text="Powerful AI Tools"
                speed={2.2}
                delay={0}
                color="#a2a8b1"
                shineColor="#393cc3"
                spread={120}
                direction="left"
                yoyo={false}
                pauseOnHover
                disabled={false}
            />
            <p className="text-base text-gray-600 text-center">Everything you need to create, enhance, and optimize your content with<br />cutting-edge AI technology.</p>
            <div className='flex flex-wrap gap-8 mt-6 p-4'>
                {features.map((feature, index) => (
                    <div key={index} className='flex flex-col h-[12vw] w-[23vw] gap-2 p-4 bg-white flex flex-col items-center justify-center rounded-lg'>
                        <span className="flex items-center justify-center">{feature.icon}</span>
                        <h3 className="text-lg font-semibold">{feature.title}</h3>
                        <p className="text-sm w-2/3 text-center text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}

export default Features;