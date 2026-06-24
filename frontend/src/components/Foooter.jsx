import { logo } from '../assets/assets';

export default function Footer() {
    return (
        <footer className="w-full text-sm border-t border-slate-200 text-slate-500 pt-8 sm:pt-10 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            
            {/* Main Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-14 max-w-7xl mx-auto">
                
                {/* Brand Column */}
                <div className="sm:col-span-2 lg:col-span-1">
                    <a href="https://what-ai-t53p.vercel.app">
                      <img className="h-14 sm:h-18 lg:h-20 cursor-pointer" src={logo} alt="logo" />
                    </a>
                    <p className="text-sm leading-relaxed mt-4 sm:mt-6 max-w-md">
                        PrebuiltUI is a free and open-source UI component library with over 300+ beautifully crafted, customizable components built with Tailwind CSS.
                    </p>
                </div>

                {/* Newsletter */}
                <div>
                    <h2 className="font-semibold text-gray-800 mb-3 sm:mb-5 text-base">Subscribe to our newsletter</h2>
                    <div className="text-sm space-y-4 sm:space-y-6 max-w-sm">
                        <p className="leading-relaxed">
                            The latest news, articles, and resources, sent to your inbox weekly.
                        </p>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-md bg-indigo-50">
                            <input 
                                className="focus:ring-2 bg-white ring-indigo-600 outline-none w-full py-2.5 rounded px-3 text-sm" 
                                type="email" 
                                placeholder="Enter your email" 
                            />
                            <button className="bg-indigo-600 px-4 py-2.5 text-white rounded text-sm font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <p className="py-4 sm:py-6 text-center border-t border-slate-200 mt-6 sm:mt-8 text-xs sm:text-sm">
                Copyright 2025 © <a href="https://prebuiltui.com" className="hover:text-slate-700 transition">PrebuiltUI</a> All Right Reserved.
            </p>
        </footer>
    );
}