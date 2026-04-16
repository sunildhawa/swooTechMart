"use client";

import { useState } from "react";
import { notify } from "@/utils/apiHealpers";
import Link from "next/link";
import { usePathname } from "next/navigation";
// FiPackage icon add kiya Orders ke liye 👇
import { 
    FiGrid, FiFileText, FiCreditCard, FiClock, 
    FiSettings, FiLogOut, FiUsers, FiShield, 
    FiShoppingCart, FiPackage 
} from "react-icons/fi";

const menu = [
    { name: "Dashboard", path: "/admin", icon: FiGrid },
    { name: "Category", path: "/admin/category", icon: FiFileText },
    { name: "Color", path: "/admin/color", icon: FiClock },
    { name: "Brand", path: "/admin/brand", icon: FiClock },
    { name: "Product", path: "/admin/product", icon: FiCreditCard },
    // Cart aur Orders ko yahan alag kiya gaya hai 👇
    { name: "Cart", path: "/admin/cart", icon: FiShoppingCart }, 
    { name: "Orders", path: "/admin/order", icon: FiPackage }, 
    { name: "Admin", path: "/admin/admins", icon: FiShield },
    { name: "User", path: "/admin/user", icon: FiUsers },
    { name: "Settings", path: "/admin/setting", icon: FiSettings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = () => {
        setIsLoggingOut(true);

        setTimeout(() => {
            localStorage.removeItem("admin");
            localStorage.removeItem("token");
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            window.location.href = "/admin/login";
        }, 500); 
        notify("Logout successfully", true);
    };

    return (
        <>
            {/* LOGOUT OVERLAY ANIMATION */}
            {isLoggingOut && (
                <div className="fixed inset-0 z-[999] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-500">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-orange-100 border-t-[#ff7b00] rounded-full animate-spin"></div>
                        <FiLogOut className="absolute inset-0 m-auto text-[#ff7b00]" size={24} />
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-gray-800 animate-pulse">Logging Out...</h2>
                    <p className="text-gray-500 text-sm">See you soon!</p>
                </div>
            )}

            <aside className="w-64 h-[117vh] bg-white shadow-xl flex flex-col">
                {/* LOGO */}
                <div className="px-6 py-5">
                    <h1 className="text-2xl font-bold text-[#ff7b00]">
                        Admin<span className="text-gray-800">Panel</span>
                    </h1>
                </div>

                {/* MENU */}
                <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
                    {menu.map((item) => {
                        const isActive = pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`
                                    group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                                    ${isActive
                                        ? "bg-[#ff7b00] text-white shadow-md scale-105"
                                        : "text-gray-600 hover:bg-orange-50 hover:text-[#ff7b00]"
                                    }
                                `}
                            >
                                <Icon
                                    size={20}
                                    className={`transition ${isActive ? "text-white" : "text-[#ff7b00]"}`}
                                />
                                <span className="font-medium">{item.name}</span>
                                {isActive && (
                                    <span className="ml-auto w-2 h-2 bg-white rounded-full animate-ping"></span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* LOGOUT BUTTON */}
                <div className="p-4">
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className={`w-full flex items-center gap-3 px-4 border py-3 cursor-pointer rounded-xl text-gray-600 transition-all duration-300 
                        ${isLoggingOut ? "bg-gray-100 opacity-50" : "hover:text-white hover:translate-x-2 hover:bg-[#ff7b00] shadow-sm"}`}
                    >
                        <FiLogOut size={20} className={isLoggingOut ? "animate-bounce" : ""} />
                        <span className="font-medium">
                            {isLoggingOut ? "Wait..." : "Logout"}
                        </span>
                    </button>
                </div>
            </aside>
        </>
    );
}