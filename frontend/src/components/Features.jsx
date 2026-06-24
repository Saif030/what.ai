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
      icon: <TbWriting size={26} />,
      description: "Generate high-quality, engaging articles on any topic with our AI writing technology."
    },
    {
      title: "AI Object Removal",
      icon: <FaScissors size={26} />,
      description: "Effortlessly remove objects from your images with our AI-driven tool."
    },
    {
      title: "Blog Title Generator",
      icon: <MdOutlineSubtitles size={26} />,
      description: "Find the perfect, catchy title for your blog posts with our AI-powered generator."
    },
    {
      title: "AI Image Generation",
      icon: <FaPhotoVideo size={26} />,
      description: "Create stunning visuals with our AI image generation tool. Experience the power of AI."
    },
    {
      title: "Background Removal",
      icon: <TbBackground size={26} />,
      description: "Effortlessly remove backgrounds from your images with our AI-driven tool."
    },
    {
      title: "AI Video Generation",
      icon: <MdOutlineOndemandVideo size={26} />,
      description: "Create stunning videos with our AI video generation tool. Experience the power of AI."
    }
  ];

  return (
    <div className="w-full relative py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-auto lg:min-h-[100vh]">
      <div className="flex flex-col gap-4 md:gap-6 justify-center items-center max-w-7xl w-full">
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
        <p className="text-sm sm:text-base text-gray-600 text-center px-4 max-w-2xl">
          Everything you need to create, enhance, and optimize your content with
          <br className="hidden md:block" /> cutting-edge AI technology.
        </p>
        
        {/* Grid layout: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 p-6 sm:p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow items-center justify-center text-center min-h-[200px] sm:min-h-[220px]"
            >
              <span className="flex items-center justify-center text-blue-600">
                {feature.icon}
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 max-w-xs">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;