"use client";
import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

// Types
export interface MCQData {
    mcqID: number;
    question: string;
    options: { A: string; B: string; C: string; D: string };
    correctAnswer: "A" | "B" | "C" | "D";
}

export interface ChapterWithMCQs {
    chapterID: string;
    chapterName: string;
    MCQs: MCQData[];
}

interface MCQContextType {
    loading: boolean;
    classID: string | null;
    chaptersWithMCQs: ChapterWithMCQs[];
    fetchStudentData: (classCode: string, redirect: true | false) => Promise<void>;
    fetchMCQs: () => Promise<void>;
}

const MCQContext = createContext<MCQContextType | undefined>(undefined);

export const MCQProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [classID, setClassID] = useState<string | null>(null);
    const [chaptersWithMCQs, setChaptersWithMCQs] = useState<ChapterWithMCQs[]>([]);

    const router = useRouter();

    // Auth step
    const fetchStudentData = async (classCode: string, redirect: true | false) => {
        try {
            setLoading(true);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/api/student/auth?classCode=${classCode}`
            );
            const data = await res.json();

            if (data.success) {
                setClassID(data.classID);
                localStorage.setItem("classCode", classCode);
                if (redirect) { router.push('/student/profile') }
            } else {
                alert("Invalid Class Code.");

            }
        } catch (err) {
            console.log(err)
            alert("Failed to fetch class code.");

        } finally {
            setLoading(false);
        }
    };

    // Fetch chapters + MCQs
    const fetchMCQs = async () => {
        const storedClassCode = localStorage.getItem("classCode");
        if (!storedClassCode) {
            console.warn("No class code in localStorage");
            router.push("/signin");
            return;
        }

        setLoading(true);
        try {
            const mcqfetchres = await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/api/student/fetchData?classCode=${storedClassCode}`
            );
            const mcq = await mcqfetchres.json();

            const mcqsdetails: { classID: string; mcqs: ChapterWithMCQs[] } = mcq.data;

            if (!mcqsdetails || !mcqsdetails.mcqs) return;

            setChaptersWithMCQs(mcqsdetails.mcqs);
            setClassID(mcqsdetails.classID);
        } catch (err) {
            console.log(err)
            alert("Error fetching mcqs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <MCQContext.Provider
            value={{ loading, classID, chaptersWithMCQs, fetchStudentData, fetchMCQs }}
        >
            {children}
        </MCQContext.Provider>
    );
};

// Hook
export const useMCQ = () => {
    const context = useContext(MCQContext);
    if (!context) throw new Error("useMCQ must be used within an MCQProvider");
    return context;
};
