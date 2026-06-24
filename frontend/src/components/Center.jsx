import { Link } from "react-router-dom";

function Center() {
  const customers = [
    {
      id: "1",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjt_BN7nXD3T3vHwNy0yj4WGSA_CN05zVo5A&s"
    },
    {
      id: "2",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDH_u07ZPNNEoZzluwL3b8Los9U60uXbFEzw&s"
    },
    {
      id: "3",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhoRPzpHJU86cxKlj_S45YRHwd7RV3uhOWBA&s"
    },
    {
      id: "4",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgT9iaOwLY69I5kgjWo7OioskandspcYoHzg&s"
    }
  ];

  const brands = [
    {
      name: "urban",
      image: "https://www.logggos.club/logos/urban.svg"
    },
    {
      name: "linktree",
      image: "https://www.logggos.club/logos/linktree.svg"
    },
    {
      name: "lumi",
      image: "https://www.logggos.club/logos/lumi.svg"
    },
    {
      name: "robin-golf",
      image: "https://www.logggos.club/logos/robin-golf.svg"
    },
    {
      name: "urban",
      image: "https://www.logggos.club/logos/urban.svg"
    }
  ];

  return (
    <div className="w-full py-8 md:py-12 lg:py-16 flex flex-col gap-6 md:gap-8 justify-center items-center min-h-[80vh] md:min-h-[88vh]">
      
      {/* Heading - responsive font sizes */}
      <h1 className="text-4xl md:text-5xl lg:text-7xl leading-tight font-bold text-center px-4">
        Create amazing content<br className="hidden md:block" />
        with <span className="text-blue-600">AI tools</span>
      </h1>
      
      {/* Subtitle - responsive text and padding */}
      <p className="text-gray-500 text-center text-sm md:text-base px-6 md:px-0 max-w-xl">
        Transform your content creation with our suite of premium AI tools. Write articles,
        <br className="hidden md:block" /> generate images, and enhance your workflow.
      </p>
      
      {/* Buttons - stack on mobile, row on md+ */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 w-full sm:w-auto px-6 sm:px-0">
        <Link
          to="/whatai/userHome"
          className="bg-blue-600 text-white text-base px-8 md:px-10 py-3 rounded-lg text-center hover:bg-blue-700 transition-colors"
        >
          Start Creating
        </Link>
        <button className="sm:ml-4 bg-white px-8 md:px-10 text-base py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          Learn More
        </button>
      </div>
      
      {/* Trust badge - responsive avatars */}
      <div className="flex flex-wrap items-center justify-center p-2 md:p-3 rounded-full bg-white border border-gray-300 text-sm mx-4">
        <div className="flex items-center">
          <img
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 md:border-3 border-white object-cover"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
            alt="userImage1"
          />
          <img
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 md:border-3 border-white -translate-x-2 md:-translate-x-3 object-cover"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
            alt="userImage2"
          />
          <img
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 md:border-3 border-white -translate-x-4 md:-translate-x-6 object-cover"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
            alt="userImage3"
          />
        </div>
        <p className="-translate-x-2 md:-translate-x-4 text-xs md:text-sm text-gray-600">
          Trusted by 10,000+ people
        </p>
      </div>
      
    </div>
  );
}

export default Center;