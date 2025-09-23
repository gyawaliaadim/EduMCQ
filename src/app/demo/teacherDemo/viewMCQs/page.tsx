"use client";
import React, { useEffect, useState } from "react";
import { Select, TextInput, Button } from "@mantine/core";

interface MCQ {
    chapterID: string;
    classID: string;
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

export default function TeacherDemoPage() {
    // Demo mock data
    const demoClasses = ["4", "5", "6"];
    const demoChapters: Record<string, Chapter[]> = {
        "4": [
            {
                chapterID: "ch1",
                chapterName: "Math",
                MCQs: [
                    {
                        mcqID: 1,
                        chapterID: "ch1",
                        classID: "4",
                        question: "2 + 2 = ?",
                        options: { A: "3", B: "4", C: "5", D: "6" },
                        correctAnswer: "B",
                    },
                    {
                        mcqID: 2,
                        chapterID: "ch1",
                        classID: "4",
                        question: "5 * 2 = ?",
                        options: { A: "10", B: "12", C: "8", D: "9" },
                        correctAnswer: "A",
                    },
                ],
            },
            {
                chapterID: "ch2",
                chapterName: "Science",
                MCQs: [
                    {
                        mcqID: 3,
                        chapterID: "ch2",
                        classID: "4",
                        question: "Water formula?",
                        options: { A: "H2O", B: "CO2", C: "O2", D: "H2" },
                        correctAnswer: "A",
                    },
                ],
            },
        ],
    };

    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [extractedMCQs, setExtractedMCQs] = useState<MCQ[]>([]);
    const [editingMCQId, setEditingMCQId] = useState<number | null>(null);
    const [editedMCQ, setEditedMCQ] = useState<MCQ | null>(null);

    useEffect(() => {
        if (selectedClass) {
            setChapters(demoChapters[selectedClass] ?? []);
            setSelectedChapter(null);
        }
    }, [selectedClass]);

    useEffect(() => {
        let extracted: MCQ[] = [];
        if (selectedClass && selectedChapter === "all") {
            chapters.forEach((ch) => extracted.push(...ch.MCQs));
        } else if (selectedClass && selectedChapter) {
            const ch = chapters.find((c) => c.chapterID === selectedChapter);
            if (ch) extracted = ch.MCQs;
        }
        setExtractedMCQs(extracted);
    }, [selectedChapter, chapters]);

    const startEdit = (mcq: MCQ) => {
        setEditingMCQId(mcq.mcqID);
        setEditedMCQ({ ...mcq });
    };

    const cancelEdit = () => {
        setEditingMCQId(null);
        setEditedMCQ(null);
    };

    const saveEdit = () => {
        if (!editedMCQ) return;
        setExtractedMCQs((prev) =>
            prev.map((mcq) => (mcq.mcqID === editedMCQ.mcqID ? editedMCQ : mcq))
        );
        alert("MCQ updated (demo)");
        cancelEdit();
    };

    return (
        <div className="p-4 space-y-4 max-w-3xl mx-auto">
            <Select
                label="Class"
                placeholder="Select class"
                data={[{ value: "all", label: "All Classes" }, ...demoClasses.map((c) => ({ value: c, label: `Class ${c}` }))]}
                value={selectedClass}
                onChange={setSelectedClass}
            />
            {selectedClass && selectedClass !== "all" && (
                <Select
                    label="Chapter"
                    placeholder="Select chapter"
                    data={[
                        { value: "all", label: "All Chapters" },
                        ...chapters.map((ch) => ({ value: ch.chapterID, label: ch.chapterName })),
                    ]}
                    value={selectedChapter}
                    onChange={setSelectedChapter}
                />
            )}

            <div className="space-y-4">
                {extractedMCQs.map((mcq, idx) => {
                    const isEditing = editingMCQId === mcq.mcqID;
                    return (
                        <div
                            key={mcq.mcqID}
                            className="border-2 border-gray-300 rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow relative"
                        >
                            {!isEditing && (
                                <Button size="xs" variant="outline" className="absolute top-2 right-2" onClick={() => startEdit(mcq)}>
                                    Edit
                                </Button>
                            )}

                            {isEditing && editedMCQ ? (
                                <div className="space-y-2">
                                    <TextInput
                                        label={`Q${idx + 1} Question`}
                                        value={editedMCQ.question}
                                        onChange={(e) => setEditedMCQ({ ...editedMCQ, question: e.target.value })}
                                    />
                                    {(["A", "B", "C", "D"] as const).map((key) => (
                                        <TextInput
                                            key={key}
                                            label={`Option ${key}`}
                                            value={editedMCQ.options[key]}
                                            onChange={(e) =>
                                                setEditedMCQ({ ...editedMCQ, options: { ...editedMCQ.options, [key]: e.target.value } })
                                            }
                                        />
                                    ))}
                                    <Select
                                        label="Correct Answer"
                                        value={editedMCQ.correctAnswer}
                                        onChange={(val) => setEditedMCQ({ ...editedMCQ, correctAnswer: val as "A" | "B" | "C" | "D" })}
                                        data={[{ value: "A", label: "A" }, { value: "B", label: "B" }, { value: "C", label: "C" }, { value: "D", label: "D" }]}
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
                                        Q{idx + 1}: {mcq.question}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                        {Object.entries(mcq.options).map(([key, value]) => (
                                            <div
                                                key={key}
                                                className={`p-2 border rounded-lg ${mcq.correctAnswer === key ? "bg-green-100 border-green-500" : "bg-gray-50"}`}
                                            >
                                                {key}: {value}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-sm font-medium text-gray-700">Correct Answer: {mcq.correctAnswer}</div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
