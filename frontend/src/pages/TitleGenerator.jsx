import Output from "../components/Output";
import { FaHashtag } from "react-icons/fa";

function TitleGenerator() {
    const category = ["General","Technology","Business","Health","Science","Education","Entertainment","Sports","Travel","Food","Lifestyle","Other"]

    return (
        <div className="flex p-6 w-full justify-center gap-14">
            <div className="w-[35vw] p-10 flex flex-col gap-1 max-h-fit rounded-2xl bg-white shadow-lg">
                <div className="flex item-center gap-3">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-bold">AI Article Generator</h1>
                        <p className="text-sm text-gray-500">Generate high-quality articles with AI</p>
                    </div>
                    <FaHashtag className="text-4xl text-purple-500" />
                </div>
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">KeyWord</p>
                    <input type="text" placeholder="The Future of AI in Web Development" className="w-full text-sm text-gray-600 mt-2 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none" />
                </div>
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">Category</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {category.map((cat) => (
                            <div key={cat} className="flex items-center gap-2 text-sm text-purple-800 bg-purple-400/10 border border-indigo-200 rounded-full px-4 py-1">
                                <span className="text-sm">{cat}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="bg-purple-500 text-white px-4 py-2 mt-4 rounded-xl flex items-center justify-center gap-2"><FaHashtag /> Generate Titles</button>
            </div>
            <Output title={"Generated Titles"} resultColor={"purple-500"} icon1={<FaHashtag className="text-3xl text-purple-500 mx-auto" />} description={"click generate titles button get AI generated titles"}/>
        </div>
    )
}

export default TitleGenerator;