"use client";
import { Table, ScrollArea } from "@mantine/core";

import { useState, useEffect } from "react";
import { TextInput, MultiSelect, Button, Box, Stack, Title } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppData } from "@/store/DataProvider";

export default function TeacherForm() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const { teacherDetails, teacherClassList, chapterDetails, MCQData, loading, fetchData } = useAppData();
    const dataCxt = useAppData(); // full context dependency

    const [name, setName] = useState<string>("");
    const [classList, setClassList] = useState<string[] | null>([]);

    // Populate form state from context once
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/signin");
            return;
        }

        if (status === "loading" || !session) return;

        setName(teacherDetails?.name ?? "");
        setClassList(teacherDetails?.classList ?? []);
    }, [dataCxt]);

    if (status === "loading" || loading) return <div>Loading</div>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                name: name,
                classList: classList,
                email: session?.user?.email,

            }),
        };

        const r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/teacherDetails`, requestOptions);
        const result = await r.json();

        if (result.success) {
            alert(result.message);
            await fetchData()
        } else {
            alert(result.message || "Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="max-w-[300px] flex justify-center items-center flex-col mx-auto">
            <Box className="" mx="auto" mt={50}>
                <form onSubmit={handleSubmit}>
                    <Stack className="gap-5">
                        <h1 className="text-5xl font-extrabold text-center">Welcome!</h1>
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
                            data={["Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"]}
                            value={classList?.map((cls) => `Class ${cls}`) ?? []}
                            onChange={(vals) => setClassList(vals.map((v) => v.replace("Class ", "")))}
                            searchable
                        />

                        <Button type="submit" fullWidth>
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Box>
            <Box mt={50} className="w-full">
                <Title order={4}>Your Class Codes</Title>
                <ScrollArea className="w-full">
                    <Table striped highlightOnHover verticalSpacing="md" className="w-full">
                        <thead>
                            <tr className="bg-gray-200 text-gray-800">
                                <th className="px-4 py-2 text-left font-semibold">Class</th>
                                <th className="px-4 py-2 text-left font-semibold">Class Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teacherDetails?.classCodeList?.map((cls) => (
                                <tr
                                    key={cls.classID}
                                    className="hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <td className="px-4 py-2 text-gray-700">{`Class ${cls.classID}`}</td>
                                    <td className="px-4 py-2 text-gray-700">{cls.classCode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </ScrollArea>
            </Box>




        </div>
    )

}
