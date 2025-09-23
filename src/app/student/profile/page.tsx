"use client";
import { useState, useEffect } from "react";
import { TextInput, Avatar, Group, Text } from "@mantine/core";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useMCQ } from "@/store/MCQProvider";

export default function StudentProfile() {
    const [name, setName] = useState("");
    const [saved, setSaved] = useState(false);
    const [data, setData] = useState<{ day: number; avg: number }[]>([]);
    const { classID, fetchStudentData } = useMCQ()
    useEffect(() => {
        const statsStr = localStorage.getItem("stats");
        const classCode = localStorage.getItem("classCode");
        if (!statsStr) return;

        const statsArr = JSON.parse(statsStr).map((s: string) => parseFloat(s));

        // Calculate cumulative averages
        let cumulativeSum = 0;
        const cumulativeData = statsArr.map((score: number, idx: number) => {
            cumulativeSum += score;
            return { day: idx + 1, avg: +(cumulativeSum / (idx + 1)).toFixed(2) };
        });
        fetchStudentData(classCode ?? "", false)
        setData(cumulativeData);
    }, []);

    // Load from localStorage
    useEffect(() => {
        const storedName = localStorage.getItem("studentName");
        if (storedName) setName(storedName);
    }, []);

    const handleSave = () => {
        localStorage.setItem("studentName", name);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000); // temporary "saved" message
    };

    return (
        <>
            <div className="p-8 max-w-md mx-auto mt-10 space-y-6">
                <Text className="text-3xl font-bold text-gray-800 text-center">
                    Student Profile
                </Text>
                <div className="flex justify-center">
                    <Avatar
                        src="/assets/default-profile.jpg" // replace with actual profile picture
                        alt="Profile"
                        size={100}
                        radius={100}
                    />
                </div>

                <div className="space-y-3">
                    <TextInput
                        label="Name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                    <Text>
                        Class {classID}
                    </Text>

                    <Group className="flex flex-col justify-center items-center">
                        <div
                            onClick={handleSave}
                            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
                        >
                            Save
                        </div>
                        {saved && <Text className="text-green-600 font-semibold">Saved!</Text>}
                    </Group>
                </div>
            </div>
            <div className="min-h-96  mx-auto mt-10 bg-white rounded-2xl shadow-md h-max">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Student Progress</h2>
                <ResponsiveContainer width="100%" height={400} >
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" label={{ value: "Attempt", position: "insideBottomRight", offset: -5 }} />
                        <YAxis label={{ value: "Cumulative Avg (%)", angle: -90, position: "insideLeft" }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}