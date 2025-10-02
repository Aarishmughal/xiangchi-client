import { Outlet } from "react-router-dom";
import HeroBg from "../assets/Hero-Bg.webp";

export default function AuthLayout() {
    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${HeroBg})` }}
        >
            <Outlet />
        </div>
    );
}
