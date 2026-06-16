import { RotateCcw } from "lucide-react";

function Output({title,icon1,description,resultColor}) {
    return (
            <div className="w-[35vw] p-10 bg-white shadow-lg rounded-2xl relative">
                <div className="w-full flex justify-between items-center">
                    <h1 className={`text-2xl text-${resultColor} font-bold flex items-center gap-2`}>{icon1}{title}</h1>
                    <button className={`bg-${resultColor} text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2`}><RotateCcw /> Regenerate</button>
                </div>
                <div className="p-3 w-full absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    {icon1}
                    <p className="text-sm text-gray-600 text-center mt-2">{description}</p>
                </div>
            </div>
    )
}

export default Output