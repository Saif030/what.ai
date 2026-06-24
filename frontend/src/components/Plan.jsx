import { PricingTable } from "@clerk/react";
import ShinyText from "./ShinyText";

function Plan() {
    return (
        <div className="w-full relative py-8 sm:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 flex flex-col gap-8 sm:gap-10 lg:gap-12 mt-4 mb-16 sm:mb-20 lg:mb-30 justify-center items-center">
            
            {/* Header Section */}
            <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center max-w-3xl mx-auto px-2">
                <ShinyText
                    text="Enhance AI Tools"
                    speed={2.2}
                    delay={0}
                    color="#a2a8b1"
                    shineColor="#393cc3"
                    spread={120}
                    direction="left"
                    yoyo={false}
                    pauseOnHover
                    disabled={false}
                />
                <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
                    Everything you need to create, enhance, and optimize your content with
                    <br className="hidden sm:block" /> cutting-edge AI technology.
                </p>
            </div>

            {/* Pricing Table */}
            <div className="w-full max-w-6xl mx-auto">
                <PricingTable />
            </div>
        </div>
    );
}

export default Plan;