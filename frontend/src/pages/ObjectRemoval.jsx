import { RiAiGenerate2 } from "react-icons/ri";
import Output from "../components/Output";
import { FcRemoveImage } from "react-icons/fc";
import { ImageOff } from "lucide-react";


function ObjectRemoval() {
    return (
        <div className="flex p-6 w-full justify-center gap-14">
            <div className="w-[35vw] max-h-fit p-10 flex flex-col rounded-2xl bg-white shadow-lg">
                <div className="flex item-center gap-3">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-bold">Upload Image</h1>
                        <p className="text-sm text-gray-500">Remove objects from images with AI</p>
                    </div>
                    <FcRemoveImage className="text-4xl text-blue-500" />
                </div>
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">Article Topic</p>
                    <input type="file" placeholder="Upload image" className="w-full text-sm text-gray-600 mt-2 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none" />
                </div>
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">Describe Object To Remove</p>
                    <textarea
                        placeholder="ex:-remove car from background"
                        className="border border-gray-300 max-h-[48vh] px-4 mt-2 py-2 rounded-lg min-h-30 w-full focus:outline-none focus:ring-0"
                    ></textarea>

                </div>
                <button className="bg-sky-500 cursor-pointer text-white px-4 py-2 mt-4 rounded-xl flex items-center justify-center gap-2"><RiAiGenerate2 />Remove Object</button>
            </div>
            <Output title={"Processed Image"} resultColor={"sky-500"} icon1={<ImageOff className="text-3xl text-sky-500 mx-auto" />} description={"click generate object removal button get AI generated Object Removal"}/>
        </div>
    )
}

export default ObjectRemoval;