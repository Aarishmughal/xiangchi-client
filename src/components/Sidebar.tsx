import {
    Home,
    Puzzle,
    GraduationCap,
    MessageSquare,
    Diamond,
    Settings,
    ChevronDown,
    Bell,
    ChevronLeft,
    ChevronRight,
    Monitor,
    Tv,
    Trophy,
    BarChart3,
    Save,
    Clock,
    Menu,
    X,
    LogOut,
    User,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

type UserData = {
    id: string;
    username: string;
    email: string;
    avatar?: string;
};
interface SidebarProps {
    REFRESH_ENDPOINT: string;
    PROFILE_ENDPOINT: string;
    LOGOUT_ENDPOINT: string;
}

// Cookie utility functions
const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(";").shift() || null;
    }
    return null;
};

function SideBar({
    REFRESH_ENDPOINT,
    PROFILE_ENDPOINT,
    LOGOUT_ENDPOINT,
}: SidebarProps) {
    const [showPlaySubmenu, setShowPlaySubmenu] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleTokenRefresh = async () => {
        try {
            const refreshToken = getCookie("refreshToken");

            const response = await axios.post(`${REFRESH_ENDPOINT}`, {
                refreshToken,
            });

            if (response.data.accessToken) {
                const userResponse = await axios.get(PROFILE_ENDPOINT, {
                    headers: {
                        Authorization: `Bearer ${response.data.accessToken}`,
                    },
                });
                setUser(userResponse.data.user || userResponse.data);
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
        }
    };

    // Fetch current user on component mount
    useEffect(() => {
        console.log("Sidebar mounted, fetching user...");
        console.log("Cookies:", document.cookie);
        const fetchCurrentUser = async () => {
            try {
                const accessToken = getCookie("accessToken");
                if (!accessToken) {
                    setLoading(false);
                    return;
                }

                const response = await axios.get(PROFILE_ENDPOINT, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setUser(response.data.user || response.data);
                console.log("Fetched user:", response.data);
            } catch (error: unknown) {
                console.error("Failed to fetch user:", error);
                if (
                    axios.isAxiosError(error) &&
                    error.response?.status === 401
                ) {
                    await handleTokenRefresh();
                }
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentUser();
    });

    // Handle logout functionality
    const handleLogout = async () => {
        try {
            console.log("Logging out, current cookies:", document.cookie);
            const accessToken = getCookie("accessToken");

            if (accessToken) {
                await axios.get(LOGOUT_ENDPOINT);
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            toast.success("Logged out successfully");
            navigate("/login");
        }
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setIsCollapsed(false);
            }
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (showUserMenu && !target.closest('.user-dropdown-container')) {
                setShowUserMenu(false);
            }
        };

        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserMenu]);

    const handleNavigation = (path: string) => {
        navigate(path);
        if (isMobile) {
            setIsMobileMenuOpen(false);
        }
    };

    const getUserInitial = (username?: string) => {
        return username ? username.charAt(0).toUpperCase() : "U";
    };

    if (loading) {
        return (
            <div className="fixed left-0 top-0 h-screen w-64 bg-[#c2352e] text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    const toggleSidebar = () => {
        if (isMobile) {
            setIsMobileMenuOpen(!isMobileMenuOpen);
        } else {
            setIsCollapsed(!isCollapsed);
        }
        setShowPlaySubmenu(false);
    };

    // Mobile Menu Button (only visible on mobile)
    if (isMobile && !isMobileMenuOpen) {
        return (
            <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="fixed top-4 left-4 z-50 md:hidden bg-red-600 text-white p-2 rounded-lg shadow-lg"
            >
                <Menu className="w-6 h-6" />
            </button>
        );
    }

    // Mobile Overlay
    if (isMobile && isMobileMenuOpen) {
        return (
            <>
                {/* Overlay */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Mobile Sidebar */}
                <aside className="fixed left-0 top-0 h-screen w-80 bg-[#c2352e] text-white flex flex-col justify-between z-50 md:hidden">
                    {/* Mobile Header with Close Button */}
                    <div>
                        <div className="flex items-center justify-between px-4 py-6">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-8 h-8 rounded-full bg-white text-red-700 flex items-center justify-center font-medium cursor-pointer"
                                    onClick={() =>
                                        handleNavigation("/play-xiangqi")
                                    }
                                >
                                    相
                                </div>
                                <span
                                    className="text-lg font-bold cursor-pointer"
                                    onClick={() =>
                                        handleNavigation("/play/home")
                                    }
                                >
                                    Xiangqi.com
                                </span>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-white hover:bg-red-600 p-1 rounded"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Mobile Menu Items */}
                        <nav className="flex flex-col gap-2 mt-4">
                            <button
                                onClick={() => handleNavigation("/play/new")}
                                className="flex items-center justify-between px-6 py-4 hover:bg-red-600 transition w-full cursor-pointer text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <Home className="w-5 h-5" />
                                    <span>Play</span>
                                </div>
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => handleNavigation("/puzzles")}
                                className="flex items-center justify-between px-6 py-4 hover:bg-red-600 transition cursor-pointer text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <Puzzle className="w-5 h-5" />
                                    <span>Puzzles</span>
                                </div>
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => handleNavigation("/lessons")}
                                className="flex items-center justify-between px-6 py-4 hover:bg-red-600 transition cursor-pointer text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <GraduationCap className="w-5 h-5" />
                                    <span>Learn</span>
                                </div>
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => handleNavigation("/inbox")}
                                className="flex items-center justify-between px-6 py-4 hover:bg-red-600 transition cursor-pointer text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="w-5 h-5" />
                                    <span>Chat</span>
                                </div>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </nav>

                        {/* Mobile Ad-Free Button */}
                        <div className="px-4 mt-6">
                            <button className="w-full flex items-center justify-center gap-2 bg-white text-red-700 rounded-lg py-3 font-medium hover:bg-red-100 transition cursor-pointer">
                                <Diamond className="w-5 h-5 text-red-500" />
                                Go Ad-Free
                            </button>
                        </div>
                    </div>

                    {/* Mobile Bottom Section */}
                    <div className="px-4 py-6">
                        <div className="relative user-dropdown-container">
                            <div 
                                className="flex items-center justify-between bg-red-600 px-3 py-2 rounded-lg cursor-pointer"
                                onClick={() => setShowUserMenu(!showUserMenu)}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-sm font-bold">
                                        {user
                                            ? getUserInitial(user.username)
                                            : "U"}
                                    </div>
                                    <span className="font-medium">
                                        {user ? user.username : "Guest"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                                    <Bell className="w-5 h-5" />
                                </div>
                            </div>

                            {/* User Menu Dropdown */}
                            {showUserMenu && (
                                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white text-gray-800 rounded-lg shadow-xl border z-70">
                                    <div className="py-2">
                                        <button
                                            onClick={() => {
                                                handleNavigation("/profile");
                                                setShowUserMenu(false);
                                            }}
                                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition w-full text-left"
                                        >
                                            <User className="w-4 h-4" />
                                            <span>Profile</span>
                                        </button>
                                        <hr className="my-1" />
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 transition w-full text-left"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </aside>
            </>
        );
    }

    // Desktop Sidebar
    return (
        <aside
            className={`hidden md:flex fixed left-0 top-0 h-screen bg-[#c2352e] text-white flex-col justify-between z-50 transition-all duration-300 ${
                isCollapsed ? "w-16" : "w-64"
            }`}
        >
            {/* Desktop content - same as before but wrapped in hidden md:flex */}
            <div>
                {/* Logo */}
                <div className="flex items-center gap-2 px-4 py-6">
                    <div
                        className="w-8 h-8 rounded-full bg-white text-red-700 flex items-center justify-center font-medium cursor-pointer"
                        onClick={() => handleNavigation("/play-xiangqi")}
                    >
                        相
                    </div>
                    {!isCollapsed && (
                        <span
                            className="text-lg font-bold cursor-pointer"
                            onClick={() => handleNavigation("/play-xiangqi")}
                        >
                            Xiangqi.com
                        </span>
                    )}
                </div>

                {/* Menu Items */}
                <nav className="flex flex-col gap-2 mt-4">
                    {/* Play Button with Submenu */}
                    <div
                        className="relative"
                        onMouseEnter={() =>
                            !isCollapsed && setShowPlaySubmenu(true)
                        }
                        onMouseLeave={() => setShowPlaySubmenu(false)}
                    >
                        <button
                            onClick={() => handleNavigation("/play/new")}
                            className="flex items-center justify-between px-6 py-3 hover:bg-red-600 transition w-full cursor-pointer"
                            title={isCollapsed ? "Play" : ""}
                        >
                            <div className="flex items-center gap-3">
                                <Home className="w-5 h-5" />
                                {!isCollapsed && <span>Play</span>}
                            </div>
                            {!isCollapsed && (
                                <ChevronRight className="w-4 h-4" />
                            )}
                        </button>

                        {/* Submenu */}
                        {showPlaySubmenu && !isCollapsed && (
                            <div className="absolute left-64 top-0 w-64 bg-[#f5f5f5] text-red-600 shadow-xl rounded-r-lg z-60">
                                <div className="py-2">
                                    <button
                                        onClick={() =>
                                            handleNavigation(
                                                "/play-xiangqi/play"
                                            )
                                        }
                                        className="flex items-center gap-3 px-6 py-3 hover:bg-red-50 transition w-full text-left cursor-pointer"
                                    >
                                        <Monitor className="w-5 h-5 text-red-500" />
                                        <span className="font-medium">
                                            Play Online
                                        </span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation("/play-computer")
                                        }
                                        className="flex items-center gap-3 px-6 py-3 hover:bg-red-50 transition w-full text-left cursor-pointer"
                                    >
                                        <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                                            <span className="text-white text-xs">
                                                🤖
                                            </span>
                                        </div>
                                        <span className="font-medium">
                                            Play Computer
                                        </span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation("/watch-games")
                                        }
                                        className="flex items-center gap-3 px-6 py-3 hover:bg-red-50 transition w-full text-left cursor-pointer"
                                    >
                                        <Tv className="w-5 h-5 text-red-500" />
                                        <span className="font-medium">
                                            Watch Games
                                        </span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation("/tournaments")
                                        }
                                        className="flex items-center gap-3 px-6 py-3 hover:bg-red-50 transition w-full text-left cursor-pointer"
                                    >
                                        <Trophy className="w-5 h-5 text-red-500" />
                                        <span className="font-medium">
                                            Tournaments
                                        </span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation("/leaderboard")
                                        }
                                        className="flex items-center gap-3 px-6 py-3 hover:bg-red-50 transition w-full text-left cursor-pointer"
                                    >
                                        <BarChart3 className="w-5 h-5 text-red-500" />
                                        <span className="font-medium">
                                            Leaderboard
                                        </span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation("/saved-games")
                                        }
                                        className="flex items-center gap-3 px-6 py-3 hover:bg-red-50 transition w-full text-left cursor-pointer"
                                    >
                                        <Save className="w-5 h-5 text-red-500" />
                                        <span className="font-medium">
                                            Saved Games
                                        </span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation("/game-history")
                                        }
                                        className="flex items-center gap-3 px-6 py-3 hover:bg-red-50 transition w-full text-left cursor-pointer"
                                    >
                                        <Clock className="w-5 h-5 text-red-500" />
                                        <span className="font-medium">
                                            Game History
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Other menu items */}
                    <button
                        onClick={() => handleNavigation("/puzzles")}
                        className="flex items-center justify-between px-6 py-3 hover:bg-red-600 transition cursor-pointer"
                        title={isCollapsed ? "Puzzles" : ""}
                    >
                        <div className="flex items-center gap-3">
                            <Puzzle className="w-5 h-5" />
                            {!isCollapsed && <span>Puzzles</span>}
                        </div>
                        {!isCollapsed && <ChevronRight className="w-4 h-4" />}
                    </button>

                    <button
                        onClick={() => handleNavigation("/lessons")}
                        className="flex items-center justify-between px-6 py-3 hover:bg-red-600 transition cursor-pointer"
                        title={isCollapsed ? "Learn" : ""}
                    >
                        <div className="flex items-center gap-3">
                            <GraduationCap className="w-5 h-5" />
                            {!isCollapsed && <span>Learn</span>}
                        </div>
                        {!isCollapsed && <ChevronRight className="w-4 h-4" />}
                    </button>

                    <button
                        onClick={() => handleNavigation("/inbox")}
                        className="flex items-center justify-between px-6 py-3 hover:bg-red-600 transition cursor-pointer"
                        title={isCollapsed ? "Chat" : ""}
                    >
                        <div className="flex items-center gap-3">
                            <MessageSquare className="w-5 h-5" />
                            {!isCollapsed && <span>Chat</span>}
                        </div>
                        {!isCollapsed && <ChevronRight className="w-4 h-4" />}
                    </button>
                </nav>

                {/* Ad-Free Button */}
                {!isCollapsed && (
                    <div className="px-4 mt-6">
                        <button className="w-full flex items-center justify-center gap-2 bg-white text-red-700 rounded-lg py-3 font-medium hover:bg-red-100 transition cursor-pointer">
                            <Diamond className="w-5 h-5 text-red-500" />
                            Go Ad-Free
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom Section */}
            <div className="px-4 py-6 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <button
                        onClick={toggleSidebar}
                        className="flex items-center gap-3 px-2 py-2 hover:bg-red-600 rounded-md transition"
                        title={isCollapsed ? "Expand" : "Collapse"}
                    >
                        <ChevronLeft
                            className={`w-5 h-5 transition-transform ${
                                isCollapsed ? "rotate-180" : ""
                            }`}
                        />
                        {!isCollapsed && <span>Collapse</span>}
                    </button>

                    <button
                        className="flex items-center gap-3 px-2 py-2 hover:bg-red-600 rounded-md transition"
                        title={isCollapsed ? "Settings" : ""}
                    >
                        <Settings className="w-5 h-5" />
                        {!isCollapsed && <span>Settings</span>}
                    </button>
                </div>

                {/* User Profile */}
                {!isCollapsed ? (
                    <div className="relative user-dropdown-container">
                        <div 
                            className="flex items-center justify-between bg-red-600 px-3 py-2 rounded-lg cursor-pointer"
                            onClick={() => setShowUserMenu(!showUserMenu)}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-sm font-bold">
                                    {user ? getUserInitial(user.username) : "U"}
                                </div>
                                <span className="font-medium">
                                    {user ? user.username : "Guest"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                                <Bell className="w-5 h-5" />
                            </div>
                        </div>

                        {/* User Menu Dropdown */}
                        {showUserMenu && (
                            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white text-gray-800 rounded-lg shadow-xl border z-70">
                                <div className="py-2">
                                    <button
                                        onClick={() => {
                                            handleNavigation("/profile");
                                            setShowUserMenu(false);
                                        }}
                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition w-full text-left"
                                    >
                                        <User className="w-4 h-4" />
                                        <span>Profile</span>
                                    </button>
                                    <hr className="my-1" />
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 transition w-full text-left"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <div
                            className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-sm font-bold cursor-pointer hover:bg-gray-800 transition"
                            title={user ? user.username : "Guest"}
                        >
                            {user ? getUserInitial(user.username) : "U"}
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}

export default SideBar;
