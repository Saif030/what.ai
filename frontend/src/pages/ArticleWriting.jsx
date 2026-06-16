import { RiAiGenerate2 } from "react-icons/ri";
import { RiAiGenerate } from "react-icons/ri";
import { RiAiGenerateText } from "react-icons/ri";
import Output from "../components/Output";
import { useState } from "react";
import { toast } from 'react-toastify';

function ArticleWriting() {
    const [topic, setTopic] = useState("");
    const [length, setLength] = useState("short");

    const onSubmit = () => {
        if (!topic.trim()) {
            toast.error("Please enter a topic");
            return;
        }
        console.log(topic, length);
    }
    
    return (
        <div className="flex p-6 w-full justify-center gap-14">
            <div className="w-[35vw] p-10 flex flex-col gap-1 h-[25vw] rounded-2xl bg-white shadow-lg">
                <div className="flex item-center gap-3">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-bold">AI Article Generator</h1>
                        <p className="text-sm text-gray-500">Generate high-quality articles with AI</p>
                    </div>
                    <RiAiGenerateText className="text-4xl text-blue-500" />
                </div>
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">Article Topic</p>
                    <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="The Future of AI in Web Development" className="w-full text-sm text-gray-600 mt-2 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none" />
                </div>
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">Article Length</p>
                    <div className="flex gap-4 mt-3">
                        <div onClick={() => setLength("short")} className={`flex items-center gap-2 text-sm text-blue-800 bg-blue-400/10 border border-indigo-200 rounded-full px-4 py-1 ${length === "short" ? "bg-blue-400/20" : ""}`}>
                            <span className="text-sm">Short (200-500) Word</span>
                        </div>

                        <div onClick={() => setLength("long")} className={`flex items-center gap-2 text-sm text-blue-800 bg-blue-400/10 border border-indigo-200 rounded-full px-4 py-1 ${length === "long" ? "bg-blue-400/20" : ""}`}>
                            <span className="text-sm">Long (1000+) Word</span>
                        </div>
                    </div>
                </div>
                <button onClick={onSubmit} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-xl flex items-center justify-center gap-2"><RiAiGenerate2 /> Generate Article</button>
            </div>
            <Output title={"Generated Article"} resultColor={"blue-500"} icon1={<RiAiGenerate className="text-3xl text-blue-500 mx-auto" />} description={"click generate article button get AI generated Article"}/>
        </div>
    )
}

export default ArticleWriting;