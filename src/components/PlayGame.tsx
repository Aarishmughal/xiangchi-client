import { Button } from "@/components/ui/button";
import HeroBg from "../assets/Hero-Bg.webp";

function PlayGame() {
    return (
        <div
            className=" h-[85vh] w-full bg-cover bg-no-repeat flex flex-col items-center justify-center gap-6 text-center p-4 sm:p-8"
            style={{ backgroundImage: `url(${HeroBg})` }}
        >
            <div>
                <h1 className="font-poppins font-semibold leading-tight text-[clamp(2rem,5vw,4.5rem)]">
                    Play Chinese Chess For Free on{" "}
                    <span className="font-bold">Xiangqi.com!</span>
                </h1>
            </div>
            <div className="flex gap-4 flex-wrap justify-center">
                {/* Quick Game button */}
                <Button className="bg-red-700 text-white px-8 py-8  rounded-full transition-colors duration-300 hover:bg-red-800 text-2xl">
                    Quick Game
                </Button>

                {/* Play Computer button */}
                <Button
                    variant="outline"
                    className="border border-red-700 text-red-700 bg-transparent px-8 py-8  rounded-full transition-colors duration-300 hover:bg-red-700 hover:text-white text-2xl"
                >
                    Play Computer
                </Button>
            </div>
        </div>
    );
}

export default PlayGame;
