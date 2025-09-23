"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Select, Table, Stack, Text, Button } from "@mantine/core";

interface ChapterItem {
    chapterID: string;
    chapterName: string;
}

export default function DemoChapterPage() {
    const router = useRouter();

    // Mock classes and chapters
    const teacherClassList = ["10", "11", "12"];
    const chapterDetails = [
        {
            classID: "10",
            chapters: [
                { chapterID: "10ch0", chapterName: "Mathematics" },
                { chapterID: "10ch1", chapterName: "Science" },
            ],
        },
        {
            classID: "11",
            chapters: [
                { chapterID: "11ch0", chapterName: "Physics" },
                { chapterID: "11ch1", chapterName: "Chemistry" },
            ],
        },
        {
            classID: "12",
            chapters: [
                { chapterID: "12ch0", chapterName: "Biology" },
                { chapterID: "12ch1", chapterName: "Computer Science" },
            ],
        },
    ];

    const [chapterList, setChapterList] = useState<Record<string, ChapterItem[]>>({});
    const [selectedClass, setSelectedClass] = useState<string | null>(null);

    // Populate chapterList
    useEffect(() => {
        const classItems: Record<string, ChapterItem[]> = {};
        teacherClassList.forEach((classID) => {
            const found = chapterDetails.find((chapterItem) => chapterItem.classID === classID);
            classItems[classID] = found?.chapters || [];
        });
        setChapterList(classItems);
    }, []);

    return (
        <div className="flex flex-col w-full h-full relative p-4">
            <Button
                className="mb-4 w-max bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => router.push("/demo/teacherDemo/chapters/addChapter")}
            >
                + Add Chapter
            </Button>

            <Stack className="flex gap-md">
                <Select
                    label="Select Class"
                    placeholder="Choose a class"
                    data={Object.keys(chapterList).map((cls) => ({ value: cls, label: cls }))}
                    value={selectedClass}
                    onChange={setSelectedClass}
                />

                {selectedClass && chapterList[selectedClass]?.length > 0 ? (
                    <Table striped highlightOnHover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Chapter Name</th>
                                <th>Chapter ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chapterList[selectedClass].map((chapter, idx) => (
                                <tr key={idx}>
                                    <td className="text-center">{idx + 1}</td>
                                    <td className="text-center">{chapter.chapterName}</td>
                                    <td className="text-center">{chapter.chapterID}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : selectedClass ? (
                    <Text>No chapters found for class {selectedClass}</Text>
                ) : null}
            </Stack>
        </div>
    );
}
