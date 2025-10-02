import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Logo from "../assets/Xiangqui-nav-logo.png";

export default function Footer() {
    return (
        <footer className="bg-[#b52c27] text-white mt-10">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
                {/* Brand */}
                <div className="space-y-4 md:col-span-2">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={Logo} alt="Xiangqi Logo" className="h-12" />
                        <span className="text-2xl font-bold">Xiangqi.com</span>
                    </Link>
                    <p className="text-sm text-gray-200 leading-relaxed">
                        Learn and master Xiangqi, the Chinese Chess. Explore
                        guides, strategies, and play with friends or in
                        tournaments.
                    </p>
                    {/* Social icons */}
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-gray-300">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="hover:text-gray-300">
                            <FaTwitter />
                        </a>
                        <a href="#" className="hover:text-gray-300">
                            <FaInstagram />
                        </a>
                        <a href="#" className="hover:text-gray-300">
                            <FaYoutube />
                        </a>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h3 className="font-semibold mb-3">About</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/about" className="hover:underline">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/team" className="hover:underline">
                                Meet the Team
                            </Link>
                        </li>
                        <li>
                            <Link to="/roadmap" className="hover:underline">
                                Product Roadmap
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/release-notes"
                                className="hover:underline"
                            >
                                Release Notes
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:underline">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Strategy</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/pin" className="hover:underline">
                                Pin
                            </Link>
                        </li>
                        <li>
                            <Link to="/fork" className="hover:underline">
                                Fork
                            </Link>
                        </li>
                        <li>
                            <Link to="/skewer" className="hover:underline">
                                Skewer
                            </Link>
                        </li>
                        <li>
                            <Link to="/discovered" className="hover:underline">
                                Discovered Attack
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Help</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/how-to-play" className="hover:underline">
                                How to Play
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/pieces-and-moves"
                                className="hover:underline"
                            >
                                Pieces and Moves
                            </Link>
                        </li>
                        <li>
                            <Link to="/rating" className="hover:underline">
                                Rating System
                            </Link>
                        </li>
                        <li>
                            <Link to="/move-limits" className="hover:underline">
                                Xiangqi Move Limits
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/chess-players"
                                className="hover:underline"
                            >
                                Xiangqi for Chess Players
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20 mt-6 py-4 text-center text-sm text-gray-200">
                © {new Date().getFullYear()} Xiangqi.com. All rights reserved.
                <p>
                    Replica by <strong>Muhammad Hassan & AArish Mughal</strong>
                </p>
            </div>
        </footer>
    );
}
