"use client";
import { useState } from "react";
import { MultiSelect, NumberInput, Button, Text, Group } from "@mantine/core";
import { useRouter } from "next/navigation";

// Your data
const chaptersWithMCQs = [
    {
        "chapterID": "ch1",
        "chapterName": "Basic Computer Concepts",
        "MCQs": [
            {
                "mcqID": 10001,
                "question": "What does CPU stand for?",
                "options": {
                    "A": "Central Process Unit",
                    "B": "Computer Personal Unit",
                    "C": "Central Processing Unit",
                    "D": "Control Processing Unit"
                },
                "correctAnswer": "C"
            },
            {
                "mcqID": 10002,
                "question": "Which of the following is not an input device?",
                "options": {
                    "A": "Keyboard",
                    "B": "Mouse",
                    "C": "Monitor",
                    "D": "Scanner"
                },
                "correctAnswer": "C"
            }
        ]
    },
    {
        "chapterID": "ch2",
        "chapterName": "Hardware and Software",
        "MCQs": [
            {
                "mcqID": 10003,
                "question": "Which type of software controls the overall operation of a computer?",
                "options": {
                    "A": "Application Software",
                    "B": "System Software",
                    "C": "Utility Software",
                    "D": "Compiler"
                },
                "correctAnswer": "B"
            },
            {
                "mcqID": 10004,
                "question": "Which of the following is a storage device?",
                "options": {
                    "A": "Printer",
                    "B": "Mouse",
                    "C": "Hard Drive",
                    "D": "CPU"
                },
                "correctAnswer": "C"
            }
        ]
    },
    {
        "chapterID": "ch3",
        "chapterName": "Internet and Networking",
        "MCQs": [
            {
                "mcqID": 10005,
                "question": "What is the full form of IP in networking?",
                "options": {
                    "A": "Internet Protocol",
                    "B": "Internal Protocol",
                    "C": "Internet Program",
                    "D": "Input Protocol"
                },
                "correctAnswer": "A"
            },
            {
                "mcqID": 10006,
                "question": "Which device is used to connect different networks together?",
                "options": {
                    "A": "Switch",
                    "B": "Router",
                    "C": "Hub",
                    "D": "Repeater"
                },
                "correctAnswer": "B"
            }
        ]
    },
    {
        "chapterID": "ch4",
        "chapterName": "Operating Systems",
        "MCQs": [
            {
                "mcqID": 10007,
                "question": "Which of the following is a type of operating system?",
                "options": {
                    "A": "Linux",
                    "B": "Python",
                    "C": "Chrome",
                    "D": "Oracle"
                },
                "correctAnswer": "A"
            },
            {
                "mcqID": 10008,
                "question": "What is the function of an operating system?",
                "options": {
                    "A": "Provides entertainment",
                    "B": "Controls hardware and manages software",
                    "C": "Manages internet browsing",
                    "D": "Acts as an antivirus"
                },
                "correctAnswer": "B"
            }
        ]
    },
    {
        "chapterID": "ch5",
        "chapterName": "Programming Fundamentals",
        "MCQs": [
            {
                "mcqID": 10009,
                "question": "Which language is primarily used for web development?",
                "options": {
                    "A": "C++",
                    "B": "Java",
                    "C": "HTML",
                    "D": "Python"
                },
                "correctAnswer": "C"
            },
            {
                "mcqID": 10010,
                "question": "What is a variable in programming?",
                "options": {
                    "A": "A function",
                    "B": "A named memory location",
                    "C": "A loop",
                    "D": "An operator"
                },
                "correctAnswer": "B"
            }
        ]
    }
]


export default function QuizSetupPage() {
    const router = useRouter();
    const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
    const [numMCQs, setNumMCQs] = useState<number>(5);
    const [error, setError] = useState("");

    const handleStartQuiz = () => {
        const availableMCQs = chaptersWithMCQs
            .filter(ch => selectedChapters.includes(ch.chapterID) || selectedChapters.includes("all"))
            .flatMap(ch => ch.MCQs);

        if (availableMCQs.length === 0) {
            setError("No MCQs available for selected chapters.");
            return;
        }

        if (numMCQs > availableMCQs.length) {
            setError(`Only ${availableMCQs.length} MCQs available.`);
            return;
        }

        // Pick random MCQs
        const shuffled = availableMCQs.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, numMCQs);

        // Pass to quiz page via state or query (here simple sessionStorage)
        sessionStorage.setItem("quizMCQs", JSON.stringify(selected));
        router.push("/demo/studentDemo/takeQuiz");
    };

    return (
        <div className="p-8 max-w-lg mx-auto">
            <Text size="xl" className="font-bold">Select Chapters & Number of MCQs</Text>

            <MultiSelect
                className="mt-4"
                data={[{ value: "all", label: "All Chapters" }, ...chaptersWithMCQs.map(ch => ({ value: ch.chapterID, label: ch.chapterName }))]}
                value={selectedChapters}
                onChange={setSelectedChapters}
                placeholder="Choose chapters"
            />

            <NumberInput
                className="mt-4"
                label="Number of MCQs"
                min={1}
                value={numMCQs}
                onChange={(value) => setNumMCQs(Number(value) || 1)}
            />

            {error && <Text color="red" className="mt-2">{error}</Text>}

            <Group className="mt-4">
                <Button onClick={handleStartQuiz}>Start Quiz</Button>
            </Group>
        </div>
    );
}
