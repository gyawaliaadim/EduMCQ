// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ITeacher } from "@/models/Teacher";
import { useAppData } from "@/store/DataProvider";
export default function Drawer() {
    const pathname = usePathname();
    const router = useRouter();


    const menuItems = [
        { name: "Take Quiz", href: "/student" },
        { name: "Profile", href: "/student/profile" },
    ];

    return (
        <div className="w-15 fixed top-0 left-0 min-h-screen sm:w-48 bg-gray-900 text-white flex flex-col justify-between">

            {/* Top Logo */}
            <div className="w-full px-1 sm:px-6 my-5">
                <Image
                    src="/assets/logo.svg"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="cursor-pointer"
                    onClick={() => router.push("/")}
                />
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-4 px-2 sm:px-6">
                {menuItems.map((item) => (
                    <Link

                        key={item.name}
                        href={item.href}
                        className={`p-1 rounded hover:bg-gray-700 transition-colors ease-out  duration-500 text-xs  ${pathname === item.href ? "bg-gray-700" : ""
                            }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            {/* Bottom Profile */}
            <div></div>
        </div>

    );
}
