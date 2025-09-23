"use client";
import { useState, useEffect } from "react";
import {
    Select,
    TextInput,
    Textarea,
    Button,
    Stack,
    Radio,
    Group,
    Title,
    Box,
} from "@mantine/core";
import { ChapterItem } from "@/models/Chapter";

export default function AddMCQDemo() {
    // Mock static demo data for classes and chapters
    const demoChapterList: Record<string, { chapterID: string; chapterName: string }[]> = {
        "7": [
            { chapterID: "7ch01", chapterName: "Introduction to Computers" },
            { chapterID: "7ch02", chapterName: "Basic Hardware" },
        ],
        "8": [
            { chapterID: "8ch01", chapterName: "Input and Output Devices" },
            { chapterID: "8ch02", chapterName: "Operating Systems" },
        ],
        "9": [
            { chapterID: "9ch01", chapterName: "Computer Software" },
            { chapterID: "9ch02", chapterName: "Networking Basics" },
        ],
        "10": [
            { chapterID: "10ch01", chapterName: "Programming Fundamentals" },
            { chapterID: "10ch02", chapterName: "Cybersecurity Basics" },
        ],
    };

    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState({ A: "", B: "", C: "", D: "" });
    const [correctAnswer, setCorrectAnswer] = useState<"A" | "B" | "C" | "D">(
        "A"
    );

    useEffect(() => {
        // Reset chapter when class changes
        setSelectedChapter(null);
    }, [selectedClass]);

    const handleOptionChange = (key: "A" | "B" | "C" | "D", value: string) => {
        setOptions({ ...options, [key]: value });
    };

    const handleSubmit = () => {
        if (!selectedClass || !selectedChapter || !question.trim()) {
            alert("Please fill all required fields.");
            return;
        }

        const demoPayload = {
            chapterID: selectedChapter,
            email: "demo_user@example.com",
            mcqID: Math.trunc(Math.random() * 100000000000 + Date.now()),
            question,
            options,
            correctAnswer,
            classID: selectedClass,
        };

        alert("Demo Submit Successful!\n\n" + JSON.stringify(demoPayload, null, 2));
        // Reset form for demo purposes
        setQuestion("");
        setOptions({ A: "", B: "", C: "", D: "" });
        setCorrectAnswer("A");
    };

    return (
        <Box className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
            <Title order={3} className="mb-6">
                Demo: Add MCQ
            </Title>

            <Stack className="flex gap-md">
                <Select
                    label="Class"
                    placeholder="Select class"
                    data={Object.keys(demoChapterList).map((key) => ({
                        value: key,
                        label: `Class ${key}`,
                    }))}
                    value={selectedClass}
                    onChange={(val) => setSelectedClass(val)}
                />

                <Select
                    label="Chapter"
                    placeholder="Select chapter"
                    disabled={!selectedClass}
                    data={
                        selectedClass
                            ? demoChapterList[selectedClass]?.map((ch: ChapterItem) => ({
                                value: ch.chapterID,
                                label: ch.chapterName,
                            })) ?? []
                            : []
                    }

                    value={selectedChapter}
                    onChange={(val) => setSelectedChapter(val)}
                />

                <Textarea
                    label="Question"
                    placeholder="Enter your question"
                    value={question}
                    onChange={(e) => setQuestion(e.currentTarget.value)}
                    autosize
                    minRows={3}
                />

                <div className="flex flex-wrap gap-4">
                    {(["A", "B", "C", "D"] as const).map((key) => (
                        <TextInput
                            key={key}
                            label={`Option ${key}`}
                            placeholder={`Option ${key}`}
                            value={options[key]}
                            className="w-[90%] sm:w-[45%]"
                            onChange={(e) => handleOptionChange(key, e.currentTarget.value)}
                        />
                    ))}
                </div>

                <Radio.Group
                    label="Correct Answer"
                    value={correctAnswer}
                    onChange={(val) => setCorrectAnswer(val as "A" | "B" | "C" | "D")}
                >
                    <Group mt="xs">
                        {(["A", "B", "C", "D"] as const).map((key) => (
                            <Radio
                                key={key}
                                value={key}
                                label={`Option ${key}`}
                                className="cursor-pointer"
                            />
                        ))}
                    </Group>
                </Radio.Group>

                <Button color="green" onClick={handleSubmit}>
                    Submit MCQ (Demo)
                </Button>
            </Stack>
        </Box>
    );
}
