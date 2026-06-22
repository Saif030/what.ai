import { Link } from "react-router-dom";

function Center() {
  const customers = [{
        id : "1",
        image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjt_BN7nXD3T3vHwNy0yj4WGSA_CN05zVo5A&s"
    },
    {
        id : "2",
        image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDH_u07ZPNNEoZzluwL3b8Los9U60uXbFEzw&s"
    },
    {
        id : "3",
        image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhoRPzpHJU86cxKlj_S45YRHwd7RV3uhOWBA&s"
    },
    {
        id:"4",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgT9iaOwLY69I5kgjWo7OioskandspcYoHzg&s"
    }
  ]

  const brands = [
    {
        name:"urban",
        image:"https://www.logggos.club/logos/urban.svg"
    },
    {
        name:"linktree",
        image:"https://www.logggos.club/logos/linktree.svg"
    },
    {
        name:"lumi",
        image:"https://www.logggos.club/logos/lumi.svg"
    },
    {
        name:"robin-golf",
        image:"https://www.logggos.club/logos/robin-golf.svg"
    },
    {
        name:"urban",
        image:"https://www.logggos.club/logos/urban.svg"
    }
  ]
  return (
    <div className="w-full py-4 flex flex-col gap-4 h-[88vh] justify-center items-center">
      <h1 className="text-7xl leading-tight font-bold text-center">
        Create amazing content<br />with <span className="text-blue-600">AI tools</span>
      </h1>
      <p className="text-gray-500 text-center">
        Transform your content creation with our suite of premium AI tools. Write articles,<br />generate images, and enhance your workflow.
      </p>
      <div className="flex mb-4">
        <Link to="/whatai/userHome" className="bg-blue-600 text-white text-base px-10 py-3 rounded-lg">Start Creating</Link>
        <button className="ml-4 bg-white px-10 text-base py-3 rounded-lg">Learn More</button>
      </div>
        <div className="flex flex-wrap items-center justify-center p-1 rounded-full bg-white border border-gray-300 text-sm">
            <div className="flex items-center">
                <img className="w-7.5 rounded-full border-3 border-white"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
                    alt="userImage1" />
                <img className="w-7.5 rounded-full border-3 border-white -translate-x-2"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
                    alt="userImage2" />
                <img className="w-7.5 rounded-full border-3 border-white -translate-x-4"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
                    alt="userImage3" />
            </div>
            <p className="-translate-x-2">Trusted by 10,000+ people</p>
        </div>
    </div>
  )
}

export default Center