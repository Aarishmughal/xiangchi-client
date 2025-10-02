import GlobeImg from "../assets/What-Is-Xianchi.png";

function WhatIsXianchi() {
    return (
        <section className="bg-red-700 text-white py-12 px-6 md:px-16">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
                {/* Left side - image */}
                <div className="flex-1 flex justify-center">
                    <img
                        src={GlobeImg}
                        alt="Xiangqi world players"
                        className="w-full max-w-md md:max-w-lg"
                    />
                </div>

                {/* Right side - text */}
                <div className="flex-1 text-center md:text-left  space-x-6">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                        What is Xiangqi?
                    </h2>
                    <p className="text-lg leading-relaxed text-justify">
                        Xiangqi (pronounced “shiang-chee”) has been played for
                        hundreds of years and is today still one of the most
                        popular board games in the world, played in China and
                        across Asia, and recently, in the West as well. You can
                        usually find men playing xiangqi in Chinatown
                        neighborhoods across the world.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default WhatIsXianchi;
