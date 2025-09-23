"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Select, TextInput, Button } from "@mantine/core";
import { useAppData } from "@/store/DataProvider";
import { ChapterItem } from "@/models/Chapter";

interface MCQ {
    chapterID: string;
    classID: string;
    email: string;
    question: string;
    options: { A: string; B: string; C: string; D: string };
    correctAnswer: "A" | "B" | "C" | "D";
    mcqID: number;
}

interface Chapter {
    chapterName: string;
    chapterID: string;
    MCQs: MCQ[];
}

const Page = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { teacherDetails, chapterDetails, MCQData, loading } = useAppData();

    const [classList, setClassList] = useState<string[]>([]);
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
    const [MCQsMap, setMCQsMap] = useState<Record<string, Chapter[]>>({});
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [extractedMCQs, setExtractedMCQs] = useState<MCQ[]>([]);
    const [editingMCQId, setEditingMCQId] = useState<number | null>(null);
    const [editedMCQ, setEditedMCQ] = useState<MCQ | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/signin");
            return;
        }
        if (status === "loading" || !session) return;

        setClassList(teacherDetails?.classList ?? []);

        if (MCQData && chapterDetails && teacherDetails?.classList) {
            const result: Record<string, Chapter[]> = {};

            teacherDetails.classList.forEach((cls) => {
                const chaptersForClass =
                    chapterDetails.find((ch) => ch.classID === cls)?.chapters ?? [];

                result[cls] = chaptersForClass.map((chapter: ChapterItem) => {
                    const MCQsForChapter = MCQData.filter(
                        (mcq) => mcq.classID === cls && mcq.chapterID === chapter.chapterID
                    );
                    return {
                        chapterName: chapter.chapterName,
                        chapterID: chapter.chapterID,
                        MCQs: MCQsForChapter,
                    };
                });
            });

            setMCQsMap(result);
        }
    }, [status, session, MCQData, chapterDetails, teacherDetails]);

    useEffect(() => {
        if (selectedClass && selectedClass !== "all") {
            setChapters(MCQsMap[selectedClass] ?? []);
        } else {
            setChapters([]);
        }
        setSelectedChapter(null);
    }, [selectedClass, MCQsMap]);

    useEffect(() => {
        let extracted: MCQ[] = [];

        if (selectedClass === "all") {
            Object.values(MCQsMap).forEach((chaptersArr) =>
                chaptersArr.forEach((ch) => extracted.push(...ch.MCQs))
            );
        } else if (selectedClass && selectedChapter === "all") {
            MCQsMap[selectedClass]?.forEach((ch) => extracted.push(...ch.MCQs));
        } else if (selectedClass && selectedChapter) {
            const chapter = MCQsMap[selectedClass]?.find(
                (ch) => ch.chapterID === selectedChapter
            );
            if (chapter) extracted = chapter.MCQs;
        }

        setExtractedMCQs(extracted);
    }, [selectedClass, selectedChapter, MCQsMap]);

    if (status === "loading" || loading) return <div>Loading...</div>;

    const startEdit = (mcq: MCQ) => {
        setEditingMCQId(mcq.mcqID);
        setEditedMCQ({ ...mcq });
    };

    const cancelEdit = () => {
        setEditingMCQId(null);
        setEditedMCQ(null);
    };

    const saveEdit = async () => {
        if (!editedMCQ) return;

        setExtractedMCQs((prev) =>
            prev.map((mcq) => (mcq.mcqID === editedMCQ.mcqID ? editedMCQ : mcq))
        );

        const payload = JSON.stringify({
            chapterID: editedMCQ.chapterID, // ObjectId string
            email: session?.user?.email, // replace with logged-in user's email
            mcqID: editingMCQId,
            question: editedMCQ.question,
            options: editedMCQ.options,
            correctAnswer: editedMCQ.correctAnswer,
            classID: editedMCQ.classID
        })

        console.log("Submitting MCQ payload:", payload);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: payload
        };

        const r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/MCQDetails`, requestOptions);
        const result = await r.json()


        if (result.success) {
            alert(result.message);

        }

        else if (!result.success) {
            alert(result.message);
        }
        else {
            alert("Something went wrong. Please try again later.")
        }
        cancelEdit()
        // send to API
        // fetch('/api/mcq', { method: 'POST', body: JSON.stringify(payload) })


        // TODO: send updated MCQ to your backend/API
    };

    return (
        <div className="p-4 space-y-4">
            {/* Class Selector */}
            <Select
                label="Class"
                placeholder="Select class"
                data={
                    classList && classList.length > 0
                        ? [
                            { value: "all", label: "All Classes" },
                            ...classList.map((cls) => ({ value: cls, label: `Class ${cls}` })),
                        ]
                        : [{ value: "", label: "Please add classes first", disabled: true }]
                }
                value={selectedClass}
                onChange={setSelectedClass}
            />

            {/* Chapter Selector */}
            {selectedClass && selectedClass !== "all" && (
                <Select
                    label="Chapter"
                    placeholder="Select chapter"
                    data={[
                        { value: "all", label: "All Chapters" },
                        ...chapters.map((ch) => ({
                            value: ch.chapterID,
                            label: ch.chapterName,
                        })),
                    ]}
                    value={selectedChapter}
                    onChange={setSelectedChapter}
                />
            )}

            {/* Display MCQs */}
            <div className="space-y-4">
                {extractedMCQs.map((mcq, index) => {
                    const isEditing = editingMCQId === mcq.mcqID;
                    return (
                        <div
                            key={mcq.mcqID}
                            className="border-2 border-gray-300 rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-200 relative"
                        >
                            {/* Edit button */}
                            {!isEditing && (
                                <Button
                                    size="xs"
                                    variant="outline"
                                    className="absolute top-2 right-2"
                                    onClick={() => startEdit(mcq)}
                                >
                                    Edit
                                </Button>
                            )}

                            {isEditing && editedMCQ ? (
                                <div className="space-y-2">
                                    <TextInput
                                        label={`Q${index + 1} Question`}
                                        value={editedMCQ.question}
                                        onChange={(e) =>
                                            setEditedMCQ({ ...editedMCQ, question: e.target.value })
                                        }
                                    />
                                    {(["A", "B", "C", "D"] as const).map((key) => (
                                        <TextInput
                                            key={key}
                                            label={`Option ${key}`}
                                            value={editedMCQ.options[key]}
                                            onChange={(e) =>
                                                setEditedMCQ({
                                                    ...editedMCQ,
                                                    options: { ...editedMCQ.options, [key]: e.target.value },
                                                })
                                            }
                                        />
                                    ))}
                                    <Select
                                        label="Correct Answer"
                                        value={editedMCQ.correctAnswer}
                                        onChange={(val) =>
                                            setEditedMCQ({ ...editedMCQ, correctAnswer: val as "A" | "B" | "C" | "D" })
                                        }
                                        data={[
                                            { value: "A", label: "A" },
                                            { value: "B", label: "B" },
                                            { value: "C", label: "C" },
                                            { value: "D", label: "D" },
                                        ]}
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <Button size="sm" onClick={saveEdit}>
                                            Save
                                        </Button>
                                        <Button size="sm" color="gray" variant="outline" onClick={cancelEdit}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="font-semibold mb-2">
                                        Q{index + 1}: {mcq.question}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                        {Object.entries(mcq.options).map(([key, value]) => (
                                            <div
                                                key={key}
                                                className={`p-2 border rounded-lg ${mcq.correctAnswer === key
                                                    ? "bg-green-100 border-green-500"
                                                    : "bg-gray-50"
                                                    }`}
                                            >
                                                {key}: {value}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-sm font-medium text-gray-700">
                                        Correct Answer: {mcq.correctAnswer}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Page;
