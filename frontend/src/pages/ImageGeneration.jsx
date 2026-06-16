import { RiAiGenerate2 } from "react-icons/ri";
import { FaImage } from "react-icons/fa";
import Output from "../components/Output";

function ImageGeneration() {
    return (
        <div className="flex p-6 w-full justify-center gap-14">
            <div className="w-[35vw] max-h-fit p-10 flex flex-col rounded-2xl bg-white shadow-lg">
                <div className="flex item-center gap-3">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-bold">AI Image Generator</h1>
                        <p className="text-sm text-gray-500">Generate high-quality articles with AI</p>
                    </div>
                    <RiAiGenerate2 className="text-4xl" />
                </div>
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">Describe Your Image</p>
                    <textarea
                        placeholder="Write something here..."
                        className="border max-h-[50vh] px-4 mt-2 py-2 rounded-lg min-h-30 w-full focus:outline-none focus:ring-0"
                    ></textarea>
                </div>
                <div className="w-full">
                    <p className="text-sm font-semibold">Image Style</p>
                    <div className="flex gap-4 mt-3">
                        <div className="flex items-center gap-2 text-sm text-black bg-black/10 border border-indigo-200 rounded-full px-4 py-1">
                            <span className="text-sm">Realistic</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-black bg-black/10 border border-indigo-200 rounded-full px-4 py-1">
                            <span className="text-sm">Artistic</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-black bg-black/10 border border-indigo-200 rounded-full px-4 py-1">
                            <span className="text-sm">Photographic</span>
                        </div>
                    </div>
                </div>
                <button className="cursor-pointer bg-black mt-8 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2"><RiAiGenerate2 /> Generate Image</button>
            </div>
            <Output title={"Generated Image"} resultColor={"black"} icon1={<FaImage className="text-3xl text-black mx-auto" />} description={"click generate image button get AI generated Image"}/>
        </div>
    )
}

export default ImageGeneration;