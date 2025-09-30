import { Monitor, Bot, Puzzle, GraduationCap, Tv } from "lucide-react";
import { useNavigate } from "react-router-dom"
function Welcome() {
  const navigate = useNavigate()
  return (
    <div className="h-screen bg-[#f5f3f0] flex flex-col items-center justify-start pt-2 md:pt-6 overflow-hidden px-4 md:px-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-lg md:text-xl font-medium text-red-600 mb-1">
            Welcome to
          </h1>
          <h1 className="text-2xl md:text-3xl font-medium text-red-600">
            Xiangqi.com!
          </h1>
        </div>

        {/* Game Options */}
        <div className="space-y-2 md:space-y-3">
          {/* Play Online */}
          <button 
            className="w-full bg-transparent border-2 border-red-300 rounded-lg p-3 md:p-4 flex items-center gap-3 hover:bg-red-50 hover:border-red-400 transition-all duration-200 shadow-sm cursor-pointer"
            onClick={() => {
              navigate("/play-xiangqi/play")
            }}
            
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Monitor className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
            </div>
            <div className="text-left min-w-0 flex-1">
              <h3 className="text-base md:text-lg font-bold text-red-600 mb-0.5 truncate">
                Play Online
              </h3>
              <p className="text-xs md:text-sm text-gray-600 line-clamp-1">
                Challenge Players Worldwide
              </p>
            </div>
          </button>

          {/* Play Computer */}
          <button 
            className="w-full border-2 border-red-300 rounded-lg p-3 md:p-4 flex items-center gap-3 hover:bg-red-50 hover:border-red-400 transition-all duration-200 shadow-sm bg-transparent"
            onClick={() => {
              console.log("Navigate to Play Computer");
            }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
            </div>
            <div className="text-left min-w-0 flex-1">
              <h3 className="text-base md:text-lg font-bold text-red-600 mb-0.5 truncate">
                Play Computer
              </h3>
              <p className="text-xs md:text-sm text-gray-600 line-clamp-1">
                Test Your Skills Against AI
              </p>
            </div>
          </button>

          {/* Solve Puzzles */}
          <button 
            className="w-full border-2 border-red-300 rounded-lg p-3 md:p-4 flex items-center gap-3 hover:bg-red-50 hover:border-red-400 transition-all duration-200 shadow-sm bg-transparent"
            onClick={() => {
              console.log("Navigate to Puzzles");
            }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Puzzle className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
            </div>
            <div className="text-left min-w-0 flex-1">
              <h3 className="text-base md:text-lg font-bold text-red-600 mb-0.5 truncate">
                Solve Puzzles
              </h3>
              <p className="text-xs md:text-sm text-gray-600 line-clamp-1">
                Solve Brain-Teasing Puzzles
              </p>
            </div>
          </button>

          {/* Lessons */}
          <button 
            className="w-full border-2 border-red-300 rounded-lg p-3 md:p-4 flex items-center gap-3 hover:bg-red-50 hover:border-red-400 transition-all duration-200 shadow-sm bg-transparent"
            onClick={() => {
              console.log("Navigate to Lessons");
            }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
            </div>
            <div className="text-left min-w-0 flex-1">
              <h3 className="text-base md:text-lg font-bold text-red-600 mb-0.5 truncate">
                Lessons
              </h3>
              <p className="text-xs md:text-sm text-gray-600 line-clamp-1">
                Learn How To Play Xiangqi
              </p>
            </div>
          </button>

          {/* Watch Games */}
          <button 
            className="w-full border-2 border-red-300 rounded-lg p-3 md:p-4 flex items-center gap-3 hover:bg-red-50 hover:border-red-400 transition-all duration-200 shadow-sm bg-transparent"
            onClick={() => {
              console.log("Navigate to Watch Games");
            }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Tv className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
            </div>
            <div className="text-left min-w-0 flex-1">
              <h3 className="text-base md:text-lg font-bold text-red-600 mb-0.5 truncate">
                Watch Games
              </h3>
              <p className="text-xs md:text-sm text-gray-600 line-clamp-1">
                Learn from other players
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;