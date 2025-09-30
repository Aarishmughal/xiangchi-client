import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Xiangqui-nav-logo.png"; // adjust path

// nav type
type NavItem = {
    name: string;
    slug?: string;
    active?: boolean;
    submenu?: { name: string; slug: string }[];
};

// nav config
const navItems: NavItem[] = [
    {
        name: "Help",
        submenu: [
            { name: "Get Started", slug: "/get-started" },
            { name: "How to Start", slug: "/how-to-start" },
            { name: "Pieces and Moves", slug: "/pieces-and-moves" },
            { name: "Play a Friend", slug: "/play-a-friend" },
            { name: "Tournament", slug: "/tournament" },
        ],
    },
    { name: "How to Play", slug: "/how-to-play" },
    { name: "English us", slug: "/language" },
    { name: "Log In", slug: "/login" },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-[#b52c27] text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-23">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src={Logo}
                            alt="Xiangqi Logo"
                            className="h-16 w-100"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) =>
                            item.submenu ? (
                                <div key={item.name} className="relative group">
                                    <button className="hover:text-gray-200">
                                        {item.name}
                                    </button>
                                    {/* Dropdown */}
                                    <div className="absolute left-0 mt-2 hidden group-hover:block bg-[#b52c27] text-white rounded-md shadow-lg w-48 z-50">
                                        {item.submenu.map((sub) => (
                                            <Link
                                                key={sub.name}
                                                to={sub.slug}
                                                className="block px-4 py-2 hover:bg-white hover:text-[#b52c27] transition"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : item.name === "Log In" ? (
                                <Link
                                    key={item.name}
                                    to={item.slug || "#"}
                                    className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-[#b52c27] transition"
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <Link
                                    key={item.name}
                                    to={item.slug || "#"}
                                    className="hover:text-gray-200"
                                >
                                    {item.name}
                                </Link>
                            )
                        )}
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="material-icons">menu</span>
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#b52c27] px-4 pb-4 space-y-2">
                    {navItems.map((item) =>
                        item.submenu ? (
                            <details key={item.name} className="text-white">
                                <summary className="cursor-pointer">
                                    {item.name}
                                </summary>
                                <div className="ml-4 mt-1 space-y-1">
                                    {item.submenu.map((sub) => (
                                        <Link
                                            key={sub.name}
                                            to={sub.slug}
                                            className="block hover:bg-white hover:text-[#b52c27] px-2 py-1 rounded transition"
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            </details>
                        ) : item.name === "Sign In" ? (
                            <Link
                                key={item.name}
                                to={item.slug || "#"}
                                className="block border border-white px-4 py-2 rounded-full text-center hover:bg-white hover:text-[#b52c27] transition"
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <Link
                                key={item.name}
                                to={item.slug || "#"}
                                className="block hover:text-gray-200"
                            >
                                {item.name}
                            </Link>
                        )
                    )}
                </div>
            )}
        </header>
    );
}
