"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/app/(public)/loading";
import { Select, Table, Stack, Text } from "@mantine/core";
import { ChapterItem, IChapter } from "@/models/Chapter";
import { useAppData } from "@/store/DataProvider";

const Page = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    const { teacherDetails, teacherClassList, chapterDetails, MCQData, loading } = useAppData();
    const dataCxt = useAppData(); // dependency for context updates

    const [chapterList, setChapterList] = useState<Record<string, ChapterItem[]>>({});
    const [selectedClass, setSelectedClass] = useState<string | null>(null);

    // Populate chapterList from context once
    const addChapters = (chaptersRaw: IChapter[] | null, classList: string[] | null) => {
        if (!chaptersRaw || !classList) return;
        const classItems: Record<string, ChapterItem[]> = {};
        classList.forEach((classID) => {
            const found = chaptersRaw.find((chapterItem) => chapterItem.classID === classID);
            classItems[classID] = found?.chapters || [];
        });
        setChapterList(classItems);
    };

    // Handle session/authentication
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/signin");
            return;
        }
        if (status == "loading" || !session) { return }
        if (status === "authenticated" && session) {
            addChapters(chapterDetails, teacherClassList);
        }
    }, [dataCxt]);

    // Populate chapterList when context is ready

    if (status === "loading" || loading) return <Loading />;

    return (
        <div className="flex flex-col w-full h-full relative p-4">
            <div
                className="p-2 right-5 absolute hover:bg-gray-300 bg-gray-200 rounded-3xl cursor-pointer w-max"
                onClick={() => router.push("/teacher/chapters/addChapter")}
            >
                + Add Chapter
            </div>

            <Stack className="flex gap-md" mt="lg">
                {/* Class Selector */}
                <Select
                    label="Select Class"
                    placeholder="Choose a class"
                    data={Object.keys(chapterList).map((cls) => ({ value: cls, label: cls }))}
                    value={selectedClass}
                    onChange={setSelectedClass}
                />

                {/* Display chapters for selected class */}
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
};

export default Page;
