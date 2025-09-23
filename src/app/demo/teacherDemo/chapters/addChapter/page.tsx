"use client";

import React, { useState } from "react";
import {
    Select,
    TextInput,
    Button,
    Box,
    Stack,
    Title,
    Group,
    ActionIcon,
    Text,
} from "@mantine/core";
import { IconArrowUp, IconArrowDown, IconTrash } from "@tabler/icons-react";

export default function ChapterFormDemo() {
    const teacherClassList = ["10", "11", "12"]; // demo classes

    const [chaptersMap, setChaptersMap] = useState<Record<string, string[]>>({});
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [chapterInput, setChapterInput] = useState("");
    const [err, setErr] = useState("");

    const chaptersForClass =
        selectedClass && chaptersMap[selectedClass] ? chaptersMap[selectedClass] : [];

    const handleAddChapter = () => {
        if (!selectedClass) {
            setErr("Select a class first");
            return;
        }
        if (!chapterInput.trim()) {
            setErr("Chapter name cannot be empty");
            return;
        }
        setChaptersMap((prev) => ({
            ...prev,
            [selectedClass]: [...(prev[selectedClass] ?? []), chapterInput.trim()],
        }));
        setChapterInput("");
        setErr("");
    };

    const moveChapter = (index: number, direction: "up" | "down") => {
        if (!selectedClass) return;
        setChaptersMap((prev) => {
            const arr = [...(prev[selectedClass] ?? [])];
            const targetIndex = direction === "up" ? index - 1 : index + 1;
            if (targetIndex < 0 || targetIndex >= arr.length) return prev;
            [arr[index], arr[targetIndex]] = [arr[targetIndex], arr[index]];
            return { ...prev, [selectedClass]: arr };
        });
    };

    const removeChapter = (index: number) => {
        if (!selectedClass) return;
        setChaptersMap((prev) => ({
            ...prev,
            [selectedClass]: (prev[selectedClass] ?? []).filter((_, i) => i !== index),
        }));
    };

    const handleSubmitChapters = () => {
        if (!selectedClass) {
            setErr("Please select a class");
            return;
        }
        const chaptersToSend = chaptersMap[selectedClass];
        if (!chaptersToSend || chaptersToSend.length === 0) {
            setErr("Enter at least one chapter");
            return;
        }

        const payload = chaptersToSend.map((name, idx) => ({
            chapterID: selectedClass + "ch" + idx + Math.trunc(Math.random() + Date.now()),
            chapterName: name,
        }));

        alert("Payload ready to send to backend:\n" + JSON.stringify(payload, null, 2));
    };

    return (
        <Box style={{ maxWidth: 500 }} className="flex flex-col" mx="auto" mt={50}>
            <Stack className="flex gap-md">
                <Title order={3}>Select Class</Title>
                <Select
                    label="Class Name"
                    placeholder="Select class"
                    data={teacherClassList.map((cls) => ({ value: cls, label: "Class " + cls }))}
                    value={selectedClass}
                    onChange={setSelectedClass}
                    required
                />

                <Title order={3} mt="md">
                    Chapters for Class {selectedClass ?? "..."}
                </Title>

                <Group>
                    <TextInput
                        placeholder="Enter chapter name"
                        value={chapterInput}
                        onChange={(e) => setChapterInput(e.currentTarget.value)}
                        style={{ flex: 1 }}
                    />
                    <Button onClick={handleAddChapter}>Add</Button>
                </Group>

                {chaptersForClass.map((chapter, index) => (
                    <Group key={index} className="flex justify-between">
                        <Box style={{ flex: 1 }}>{chapter}</Box>
                        <div className="flex gap-2">
                            <ActionIcon onClick={() => moveChapter(index, "up")} disabled={index === 0}>
                                <IconArrowUp size={18} />
                            </ActionIcon>
                            <ActionIcon
                                onClick={() => moveChapter(index, "down")}
                                disabled={index === chaptersForClass.length - 1}
                            >
                                <IconArrowDown size={18} />
                            </ActionIcon>
                            <ActionIcon color="red" onClick={() => removeChapter(index)}>
                                <IconTrash size={18} />
                            </ActionIcon>
                        </div>
                    </Group>
                ))}

                {err && <Text color="red">{err}</Text>}
                <Button color="green" onClick={handleSubmitChapters} mt="md">
                    Save Chapters
                </Button>
            </Stack>
        </Box>
    );
}
