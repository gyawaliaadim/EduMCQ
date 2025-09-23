"use client";
import { useEffect, useState } from "react";
import { MultiSelect, NumberInput, Button, Text, Group } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useMCQ } from "@/store/MCQProvider";

// Your data


export default function QuizSetupPage() {
    const router = useRouter();
    const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
    const [numMCQs, setNumMCQs] = useState<number>(5);
    const [error, setError] = useState("");
    const { loading, classID, chaptersWithMCQs, fetchStudentData, fetchMCQs } = useMCQ()
    useEffect(() => {
        fetchMCQs()
        console.log(chaptersWithMCQs)
    }, [])

    const handleStartQuiz = () => {
        let availableMCQs = chaptersWithMCQs
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
        router.push("/student/takeQuiz");
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
