import { Link } from "react-router-dom";
import QuestionImg from "../assets/How-to-play.png";

const Questions = () => {
    return (
        <>
            <section className="bg-[#f5efe5] pt-16 lg:pt-24 pb-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left Content */}
                        <div className="order-2 lg:order-1 space-y-8">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-red-600 leading-tight font-poppins">
                                How to Play
                            </h2>

                            <div className="space-y-6">
                                <p className="text-gray-700 text-lg sm:text-xl leading-relaxed font-poppins text-justify">
                                    The game of Xiangqi is played on a board of
                                    nine columns (files) and ten rows (ranks).
                                    The traditional pieces are wooden disks with
                                    red or black Chinese characters drawn on
                                    them. The pieces are lined up on the
                                    vertices. See{" "}
                                    <Link
                                        to="/how-to-play"
                                        className="text-red-600 hover:text-red-700 underline font-medium transition-colors duration-200"
                                    >
                                        How To Play Xiangqi
                                    </Link>{" "}
                                    for detailed descriptions of each piece, and
                                    detailed rules about how to play games on
                                    xiangqi.com.
                                </p>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="order-1 lg:order-2">
                            <img
                                src={QuestionImg}
                                alt="Xiangqi game illustration"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Optional: Bottom decorative line */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-red-200 to-transparent"></div>
                </div>
            </section>

            <section className="bg-[#f5efe5] py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-red-600 font-poppins mb-6">
                        Play Online 2 Player Chinese Chess Game
                    </h2>
                    <p className="text-gray-700 text-lg sm:text-xl leading-relaxed font-poppins text-justify">
                        Create Chinese chess games online for 2 players or join
                        games created by others. Players can choose different
                        sides, game timers, increments, and move timers when
                        creating a new game. Untimed 2 players Chinese chess
                        game is also supported on Xiangqi.com so that players
                        can enjoy free Chinese chess games online anywhere at
                        any time. After the game, players can improve their
                        skills by using the engine analysis feature to analyze
                        and review the game.
                    </p>
                </div>

                <div className="max-w-7xl my-20 mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-red-600 font-poppins mb-6">
                        Play Chinese Chess Games against Computer
                    </h2>
                    <p className="text-gray-700 text-lg sm:text-xl leading-relaxed font-poppins text-justify">
                        The Play Computer feature offers 5 levels of difficulty
                        for players to prepare themselves for a multiplayer
                        Xiangqi match. The Level 1 Computer is a good companion
                        for beginners to familiarize themselves with Chinese
                        chess. Once players are able to beat the Level 1
                        Computer, they can challenge the next level and improve
                        their skills to play Chinese chess against other players
                        more proficiently.
                    </p>
                </div>

                <div className="max-w-7xl my-20 mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-red-600 font-poppins mb-6">
                        Play Chinese Chess Puzzles
                    </h2>
                    <p className="text-gray-700 text-lg sm:text-xl leading-relaxed font-poppins text-justify">
                        Play online Chinese Chess puzzles on Xiangqi.com to
                        improve your skills! We provide players with numerous
                        free Chinese chess puzzles, allowing Xiangqi enthusiasts
                        to enjoy the fun of playing Chinese chess and practice
                        their tactics through puzzles. In addition, players can
                        design and name their own puzzles on Xiangqi.com using
                        the Create Puzzles feature and share them with other
                        players.
                    </p>
                </div>

                <div className="max-w-7xl my-20 mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-red-600 font-poppins mb-6">
                        Rating and Ranking
                    </h2>
                    <p className="text-gray-700 text-lg sm:text-xl leading-relaxed font-poppins text-justify">
                        After a player finishes an online 2-player Chinese chess
                        rated game on Xiangqi.com, the player's rating will be
                        adjusted according to the ELO rating system. When a
                        player's rating reaches the top 20 across the whole
                        platform or in his/her own country, he/she will be shown
                        on the global leaderboard or national leaderboard and
                        becoming the star on Xiangqi.com.
                    </p>
                </div>

                <div className="max-w-7xl my-20 mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-red-600 font-poppins mb-6">
                        An international online Chinese chess community
                    </h2>
                    <p className="text-gray-700 text-lg sm:text-xl leading-relaxed font-poppins text-justify">
                        The mission of Xiangqi.com is to promote Chinese chess,
                        a cultural treasure with a long history, to people from
                        all over the world, as well as to provide a platform for
                        Xiangqi enthusiasts to learn, enjoy, and communicate
                        with each other. Xiangqi.com is the only online Chinese
                        chess platform that offers both web and app versions in
                        Simplified Chinese, Traditional Chinese, English, and
                        Vietnamese, allowing Chinese chess enthusiasts from
                        different countries to enjoy the fun of playing Xiangqi
                        online without language barriers. Graphical pieces are
                        also available on Xiangqi.com to help anyone who is not
                        familiar with Chinese to learn Chinese chess.
                    </p>
                </div>
            </section>
        </>
    );
};

export default Questions;
