"use client";
import { useState, useEffect } from "react";
import { Card, Text, Radio, Button, Group } from "@mantine/core";
import { useRouter } from "next/navigation";

interface MCQ {
    mcqID: number;
    question: string;
    options: Record<string, string>;
    correctAnswer: string;
}

export default function TakeQuizPage() {
    const [mcqs, setMcqs] = useState<MCQ[]>([]);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter()
    useEffect(() => {
        const saved = sessionStorage.getItem("quizMCQs");
        if (saved) setMcqs(JSON.parse(saved));
    }, []);

    const handleAnswerChange = (mcqID: number, value: string) => {
        setAnswers(prev => ({ ...prev, [mcqID]: value }));
    };

    const handleSubmit = () => {
        setSubmitted(true);

        const percent = String((score * 100) / mcqs.length);

        // Get existing stats from localStorage or default to an empty array
        const storedStats = localStorage.getItem("stats");
        const stats = storedStats ? JSON.parse(storedStats) : [];

        // Add new percent to the stats array
        const newStats = [...stats, percent];

        // Save back to localStorage
        localStorage.setItem("stats", JSON.stringify(newStats));
    };

    const score = mcqs.filter(mcq => answers[mcq.mcqID] === mcq.correctAnswer).length;

    return (
        <div className="p-6 md:p-12 max-w-4xl mx-auto space-y-6">
            <Text className="text-2xl md:text-3xl font-extrabold text-gray-800 text-center mb-4">
                Take Your Quiz
            </Text>

            {mcqs.map(mcq => (
                <Card
                    key={mcq.mcqID}
                    shadow="md"
                    className={`
    p-6 rounded-2xl border border-gray-200 transition-all duration-300
    ${submitted
                            ? answers[mcq.mcqID] === mcq.correctAnswer
                                ? "bg-green-200"
                                : "bg-red-200"
                            : "hover:shadow-xl"
                        }
  `}
                >

                    <Text className="text-lg md:text-xl font-semibold mb-4 text-gray-900">
                        {mcq.question}
                    </Text>

                    <Radio.Group
                        value={answers[mcq.mcqID] || ""}
                        onChange={val => handleAnswerChange(mcq.mcqID, val)}
                    >
                        <div className="flex flex-col gap-3">
                            {Object.entries(mcq.options).map(([key, val]) => (
                                <Radio
                                    key={key}
                                    value={key}
                                    label={String(val ?? "")}
                                    disabled={submitted}
                                    classNames={{
                                        label: "text-gray-800 font-medium",
                                        radio: "accent-blue-500"
                                    }}
                                />
                            ))}
                        </div>
                    </Radio.Group>

                    {submitted && (
                        <Text
                            className={`mt-3 font-semibold ${answers[mcq.mcqID] === mcq.correctAnswer ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            Correct Answer: {mcq.correctAnswer}
                        </Text>
                    )}
                </Card>
            ))}

            <Group className="flex justify-center items-center mt-6 w-full">
                {!submitted ? (
                    <Button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
                    >
                        Submit
                    </Button>
                ) : (
                    <div className="flex justify-center items-center flex-col">
                        <Text className="text-xl font-bold text-gray-800">
                            Score: {(score * 100) / mcqs.length}%
                        </Text>
                        <div
                            className="cursor-pointer text-center py-5 px-8 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg shadow-md transition-all duration-300"
                            onClick={() => router.back()}
                        >
                            Try Again
                        </div>

                    </div>
                )}
            </Group>
        </div>
    );
}
