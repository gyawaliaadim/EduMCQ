"use client";

import React, { useState, useEffect } from "react";
import {
    TextInput,
    MultiSelect,
    Button,
    Box,
    Stack,
    Title,
    Table,
    ScrollArea,
} from "@mantine/core";

interface ClassCode {
    classID: string;
    classCode: string;
}

export default function TeacherFormDemo() {
    const allClasses = ["4", "5", "6", "7", "8", "9", "10"];

    const [name, setName] = useState("");
    const [classList, setClassList] = useState<string[]>([]);
    const [classCodeList, setClassCodeList] = useState<ClassCode[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("teacherData");
        if (saved) {
            const data = JSON.parse(saved);
            setName(data.name || "");
            setClassList(data.classList || []);
            setClassCodeList(data.classCodeList || []);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Generate class codes for new classes
        const updatedClassCodes: ClassCode[] = classList.map((cls) => {
            const existing = classCodeList.find((c) => c.classID === cls);
            return existing || { classID: cls, classCode: Math.random().toString(36).substring(2, 8).toUpperCase() };
        });

        const dataToSave = {
            name,
            classList,
            classCodeList: updatedClassCodes,
        };

        localStorage.setItem("teacherData", JSON.stringify(dataToSave));
        setClassCodeList(updatedClassCodes);
        alert("Data saved locally!");
    };

    return (
        <div className="max-w-md flex flex-col mx-auto mt-10 p-4">
            <Box mx="auto">
                <form onSubmit={handleSubmit}>
                    <Stack className="gap-5">
                        <h1 className="text-4xl font-bold text-center">Welcome!</h1>
                        <Title order={3}>Teacher Info</Title>

                        <TextInput
                            label="Teacher Name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.currentTarget.value)}
                            required
                        />

                        <MultiSelect
                            label="Classes You Teach"
                            placeholder="Select classes"
                            data={allClasses.map((cls) => `Class ${cls}`)}
                            value={classList.map((cls) => `Class ${cls}`)}
                            onChange={(vals) => setClassList(vals.map((v) => v.replace("Class ", "")))}
                            searchable
                        />

                        <Button type="submit" fullWidth>
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Box>

            <Box mt={10} className="w-full">
                <Title order={4} className="mb-2">Your Class Codes</Title>
                <ScrollArea className="w-full max-h-64 border rounded-md">
                    <Table striped highlightOnHover verticalSpacing="md" className="w-full">
                        <thead>
                            <tr className="bg-gray-200 text-gray-800">
                                <th className="px-4 py-2 text-left font-semibold">Class</th>
                                <th className="px-4 py-2 text-left font-semibold">Class Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classCodeList.map((cls) => (
                                <tr key={cls.classID} className="hover:bg-gray-100 transition-colors duration-200">
                                    <td className="px-4 py-2 text-gray-700">{`Class ${cls.classID}`}</td>
                                    <td className="px-4 py-2 text-gray-700">{cls.classCode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </ScrollArea>
            </Box>
        </div>
    );
}
