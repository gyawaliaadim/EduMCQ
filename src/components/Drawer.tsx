// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppData } from "@/store/DataProvider";
export default function Drawer() {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [name, setName] = useState('')
    const profilePic = session?.user?.image || "/assets/default-profile.png";
    const { teacherDetails, teacherClassList, chapterDetails, MCQData, loading } = useAppData();
    const dataCxt = useAppData(); // full context dependency


    useEffect(() => {
        // if (status != "unauthenticated") {
        //     router.push('/signin')
        // }
        if (status == "loading" || !session) return;
        console.log("teacherName is ", teacherDetails?.name)
        if (teacherDetails && teacherDetails.name) {
            setName(teacherDetails.name)
        }
        else {
            setName("")
        }
    }, [dataCxt])

    if (status == "loading" || loading) return <div>Loading</div>

    const menuItems = [
        { name: "Chapters", href: "/teacher/chapters" },
        { name: "Add MCQ", href: "/teacher/addMCQ" },
        { name: "View All MCQ", href: "/teacher/viewMCQs" },
    ];

    return (
        <div className="fixed top-0 left-0 min-h-screen sm:w-48 w-20 bg-gray-900 text-white flex flex-col justify-between">
            <div className="flex flex-col">

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
                <div className="p-2">
                    <Link href="/teacher/profile" className="flex items-center p-2 gap-2 bg-gray-800 h-15 justify-center rounded hover:bg-gray-700">
                        {/* Circle for DP */}
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white">
                            <Image
                                src={profilePic}
                                alt="Profile"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </div>
                        {/* Name */}
                        <div className="flex-1 hidden sm:block text-white font-medium">
                            {name}
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
