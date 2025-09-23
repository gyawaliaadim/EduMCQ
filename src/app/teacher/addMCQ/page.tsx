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


import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ITeacher } from "@/models/Teacher";
import { ChapterItem, IChapter } from "@/models/Chapter";
import { useAppData } from "@/store/DataProvider";
export default function AddMCQ() {

    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState({ A: "", B: "", C: "", D: "" });
    const [correctAnswer, setCorrectAnswer] = useState<"A" | "B" | "C" | "D">("A");
    const router = useRouter();
    const { data: session, status } = useSession();
    const { teacherDetails, teacherClassList, chapterDetails, MCQData, loading, fetchData } = useAppData();
    const dataCxt = useAppData();
    const [chapterList, setChapterList] = useState<Record<string, ChapterItem[]>>({});
    // const [sessionTrue, setSessionTrue] = useState(false);

    // Mock addChapters function (replace with your fetch logic)
    const addChapters = (chaptersRaw: any[] | null, classList: string[] | null) => {
        const classItems: Record<string, ChapterItem[]> = {};
        classList?.forEach((classID) => {
            const found = chaptersRaw?.find((chapterItem) => chapterItem.classID === classID);
            classItems[classID] = found?.chapters || [];
        });

        setChapterList(classItems)
        // console.log(" chapter list ", classItems)
    };

    useEffect(() => {


    }, [session, router])
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/signin")
            return
        }
        if (status === "loading" || !session) {
            return
        }
        console.log(chapterDetails)
        console.log(teacherClassList)
        addChapters(chapterDetails, teacherClassList)
    }, [dataCxt])


    if (status === "loading" || loading) { return <div>Loading</div> }

    const handleOptionChange = (key: "A" | "B" | "C" | "D", value: string) => {
        setOptions({ ...options, [key]: value });
    };

    const handleSubmit = async () => {
        if (!selectedClass || !selectedChapter || !question) {
            alert("Please fill all fields");
            return;
        }

        const payload = JSON.stringify({
            chapterID: selectedChapter, // ObjectId string
            email: session?.user?.email, // replace with logged-in user's email
            mcqID: Math.trunc((Math.random() / 1) * 100000000000 + Date.now()),
            question,
            options,
            correctAnswer,
            classID: selectedClass // array of selected class(es)
        })

        // console.log("Submitting MCQ payload:", payload);
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
            alert(result.message + "\nMake sure to reload to see changes inside view mcqs.");
            fetchData()
        }

        else if (!result.success) {
            alert(result.message);
        }
        else {
            alert("Something went wrong. Please try again later.")
        }

        // send to API
        // fetch('/api/mcq', { method: 'POST', body: JSON.stringify(payload) })
    };

    return (
        <Box className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
            <Title order={3} className="mb-6">
                Add MCQ
            </Title>

            <Stack className="flex gap-md">
                <Select
                    label="Class"
                    placeholder="Select class"
                    data={
                        Object.keys(chapterList).length > 0
                            ? Object.keys(chapterList).map((key) => ({
                                value: key,
                                label: `Class ${key}`,
                            }))
                            : [{ value: "none", label: "Please add classes first.", disabled: true }]
                    }

                    value={selectedClass}
                    onChange={(val) => {
                        val ? setSelectedClass(val) : null;
                        setSelectedChapter(null); // reset chapter if class changes
                    }}
                />

                <Select
                    label="Chapter"
                    placeholder="Select chapter"
                    disabled={!selectedClass}
                    data={
                        selectedClass
                            ? chapterList[selectedClass]?.length > 0
                                ? chapterList[selectedClass].map((ch) => ({
                                    value: ch.chapterID,
                                    label: ch.chapterName,
                                }))
                                : [
                                    {
                                        value: "none",
                                        label: "Please add chapters first.",
                                        disabled: true,
                                    },
                                ]
                            : [
                                {
                                    value: "none",
                                    label: "Select a class first",
                                    disabled: true,
                                },
                            ]
                    }
                    value={selectedChapter}
                    onChange={(val) => setSelectedChapter(val === "none" ? null : val)}
                />



                <Textarea
                    label="Question"
                    placeholder="Enter your question"
                    value={question}
                    onChange={(e) => setQuestion(e.currentTarget.value)}
                />
                <div className="flex flex-wrap">

                    {(["A", "B", "C", "D"] as const).map((key) => (
                        <TextInput
                            key={key}
                            label={`Option ${key}`}
                            placeholder={`Option ${key}`}
                            value={options[key]}
                            className="w-[90%] sm:w-[45%] mx-auto  "
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
                            <Radio className="cursor-pointer" key={key} value={key} label={`Option ${key}`} />
                        ))}
                    </Group>
                </Radio.Group>

                <Button color="green" onClick={handleSubmit}>
                    Submit MCQ
                </Button>
            </Stack>
        </Box>
    );
}
