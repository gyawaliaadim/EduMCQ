"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DemoLandingPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen gap-8 bg-gray-100 p-6">
            {/* Student Demo */}
            <div
                className="flex flex-col justify-center items-center bg-white rounded-3xl shadow-lg p-10 cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => router.push("/demo/studentDemo")}
            >
                <Image
                    src="/assets/student.svg"
                    alt="Student"
                    width={100}
                    height={100}
                    className="mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800">Student Page Demo</h2>
            </div>

            {/* Teacher Demo */}
            <div
                className="flex flex-col justify-center items-center bg-white rounded-3xl shadow-lg p-10 cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => router.push("/demo/teacherDemo")}
            >
                <Image
                    src="/assets/teacher.svg"
                    alt="Teacher"
                    width={100}
                    height={100}
                    className="mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800">Teacher Page Demo</h2>
            </div>
        </div>
    );
}
