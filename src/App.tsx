import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { buildApiUrl, API_CONFIG } from "./lib/api-config";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import PlayLayout from "./layouts/PlayLayout";
import LandingPage from "./components/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./components/Welcome";
import Play from "./pages/Play";
import PlayXiangqi from "./pages/PlayXiangqi";

function App() {
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <Router>
                <Routes>
                    {/* Main Website Layout */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<LandingPage />} />
                    </Route>
                    {/* Auth Pages */}
                    <Route element={<AuthLayout />}>
                        <Route
                            path="/login"
                            element={
                                <Login
                                    API_URL={buildApiUrl(
                                        API_CONFIG.ENDPOINTS.AUTH.LOGIN
                                    )}
                                />
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <Signup
                                    API_URL={buildApiUrl(
                                        API_CONFIG.ENDPOINTS.AUTH.SIGNUP
                                    )}
                                />
                            }
                        />
                    </Route>
                    {/* Play Pages (with sidebar) */}
                    <Route element={<PlayLayout />}>
                        <Route path="/play/home" element={<Welcome />} />
                        <Route path="/play" element={<Play />} />
                        <Route path="/play-xiangqi" element={<PlayXiangqi />} />
                        <Route
                            path="/puzzles"
                            element={
                                <div className="p-8">
                                    <h1 className="text-2xl font-bold">
                                        Puzzles Page
                                    </h1>
                                </div>
                            }
                        />
                    </Route>
                    {/* <Route
                        path="/lessons"
                        element={
                            <div className="p-8">
                                <h1 className="text-2xl font-bold">
                                    Lessons Page
                                </h1>
                            </div>
                        }
                    />
                    <Route
                        path="/inbox"
                        element={
                            <div className="p-8">
                                <h1 className="text-2xl font-bold">
                                    Inbox Page
                                </h1>
                            </div>
                        }
                    />
                    <Route path="/play-xiangqi/play/game" element={<Game />} /> */}

                    {/* Submenu routes */}
                    {/* <Route path="/play-xiangqi/play" element={<Play />} />
                    <Route
                        path="/play-computer"
                        element={
                            <div className="p-8">
                                <h1 className="text-2xl font-bold">
                                    Play Computer
                                </h1>
                            </div>
                        }
                    />
                    <Route
                        path="/watch-games"
                        element={
                            <div className="p-8">
                                <h1 className="text-2xl font-bold">
                                    Watch Games
                                </h1>
                            </div>
                        }
                    />
                    <Route
                        path="/tournaments"
                        element={
                            <div className="p-8">
                                <h1 className="text-2xl font-bold">
                                    Tournaments
                                </h1>
                            </div>
                        }
                    />
                    <Route
                        path="/leaderboard"
                        element={
                            <div className="p-8">
                                <h1 className="text-2xl font-bold">
                                    Leaderboard
                                </h1>
                            </div>
                        }
                    />
                    <Route
                        path="/saved-games"
                        element={
                            <div className="p-8">
                                <h1 className="text-2xl font-bold">
                                    Saved Games
                                </h1>
                            </div>
                        }
                    />
                    <Route
                        path="/game-history"
                        element={
                            <div className="p-8">
                                <h1 className="text-2xl font-bold">
                                    Game History
                                </h1>
                            </div>
                        }
                    /> */}
                    {/* </Route> */}
                </Routes>
            </Router>
        </>
    );
}

export default App;
