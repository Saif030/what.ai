import Output from "../components/Output";
import { IoIosDocument } from "react-icons/io";

function ResumeAnalyzer() {
    return (
<div className="flex p-6 w-full justify-center gap-14">
            <div className="w-[35vw] max-h-fit p-10 flex flex-col rounded-2xl bg-white shadow-lg">
                <div className="flex item-center gap-3">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-bold">AI Resume Analyzer</h1>
                        <p className="text-sm text-gray-500">Analyze resumes with AI</p>
                    </div>
                    <IoIosDocument className="text-4xl text-taupe-500" />
                </div>
                <div className="w-full py-3">
                    <p className="text-sm font-semibold">Upload Resume</p>
                    <input type="file" placeholder="Upload resume" className="w-full text-sm text-gray-600 mt-2 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none" />
                </div>
                <button className="bg-taupe-500 cursor-pointer text-white px-4 py-2 mt-4 rounded-xl flex items-center justify-center gap-2"><IoIosDocument />Analyze Resume</button>
            </div>
            <Output title={"Analysis Result"} resultColor={"taupe-500"} icon1={<IoIosDocument className="text-3xl text-taupe-500 mx-auto" />} description={"click analyze resume button get AI generated analysis"}/>
        </div>
    )
}

export default ResumeAnalyzer;