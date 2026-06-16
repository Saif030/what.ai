import { PricingTable } from "@clerk/react"
import ShinyText from "./ShinyText"

function Plan() {
    return (
        <div
         className="w-full relative py-4 px-[15vw] flex flex-col gap-12 mt-4 mb-30 justify-center items-center">
            <div className="flex flex-col gap-2 justify-center items-center">
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
            <p className="text-base text-gray-600 text-center">Everything you need to create, enhance, and optimize your content with<br />cutting-edge AI technology.</p>
            </div>
             <PricingTable />
        </div>
    )
}

export default Plan