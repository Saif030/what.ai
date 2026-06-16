import Output from "../components/Output";
import { TbBackground } from "react-icons/tb";

function BackgroundRemoval() {
    return (
       <div className="flex p-6 w-full justify-center gap-14">
            <div className="w-[35vw] max-h-fit p-10 flex flex-col rounded-2xl bg-white shadow-lg">
                <div className="flex item-center gap-3">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-bold">AI Background Removal</h1>
                        <p className="text-sm text-gray-500">Remove backgrounds from images with AI</p>
                    </div>
                    <TbBackground className="text-4xl text-orange-500" />
                </div>
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">Upload Image</p>
                    <input type="file" placeholder="Upload image" className="w-full text-sm text-gray-600 mt-2 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none" />
                </div>
                <button className="bg-orange-500 cursor-pointer text-white px-4 py-2 mt-4 rounded-xl flex items-center justify-center gap-2"><TbBackground />Remove Background</button>
            </div>
            <Output title={"Processed Image"} resultColor={"orange-500"} icon1={<TbBackground className="text-3xl text-orange-500 mx-auto" />} description={"click generate background removal button get AI generated background removal"}/>
        </div>
    )
}

export default BackgroundRemoval;