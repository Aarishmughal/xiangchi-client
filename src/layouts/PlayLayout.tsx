import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar";
import { buildApiUrl, API_CONFIG } from "../lib/api-config";
import HeroBg from "../assets/Hero-Bg.webp";

export default function PlayLayout() {
    const [sidebarWidth, setSidebarWidth] = useState("16rem");
    useEffect(() => {
        const handleResize = () => {
            const sidebar = document.querySelector("aside");
            if (sidebar) {
                setSidebarWidth(sidebar.offsetWidth + "px");
            }
        };
        handleResize();

        const observer = new ResizeObserver(handleResize);
        const sidebar = document.querySelector("aside");
        if (sidebar) {
            observer.observe(sidebar);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${HeroBg})` }}
        >
            {/* Fixed Sidebar */}
            <SideBar
                REFRESH_ENDPOINT={buildApiUrl(
                    API_CONFIG.ENDPOINTS.AUTH.REFRESH
                )}
                PROFILE_ENDPOINT={buildApiUrl(
                    API_CONFIG.ENDPOINTS.USER.PROFILE
                )}
                LOGOUT_ENDPOINT={buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGOUT)}
            />

            {/* Main Content Area - dynamically adjust margin */}
            <main
                className="min-h-screen md:ml-64 transition-all duration-300"
                style={{ marginLeft: sidebarWidth }}
            >
                <Outlet />
            </main>
        </div>
    );
}
