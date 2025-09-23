"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { ITeacher } from "@/models/Teacher";
import { useSession } from "next-auth/react";
import { tr } from "framer-motion/client";
import { IChapter } from "@/models/Chapter";
import { IMCQ } from "@/models/MCQ";
import { fetchData } from "next-auth/client/_utils";

interface Chapter {
    chapterName: string;
    chapterId: string;
    MCQs: IMCQ[];
}


interface DataContextType {
    teacherDetails: ITeacher | null;
    teacherClassList: string[] | null;
    chapterDetails: any[] | null;
    MCQData: IMCQ[] | null;
    loading: boolean;
    fetchData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [teacherClassList, setTeacherClassList] = useState<string[] | null>(null);
    const [chapterDetails, setChapterDetails] = useState<any[] | null>(null);
    const [MCQData, setMCQData] = useState<IMCQ[] | null>(null);
    const [loading, setLoading] = useState<true | false>(true);
    const { data: session, status } = useSession();
    const [sessionTrue, setSessionTrue] = useState<true | false>(false)
    const [teacherDetails, setTeacherDetails] = useState<ITeacher | null>(null)
    useEffect(() => {

        if (session) {
            setSessionTrue(true)
        }
    }, [session, status])
    const fetchData = async () => {
        try {
            setLoading(true)
            const [teacherRes, chapterRes, mcqRes] = await Promise.all([
                fetch(`/api/teacherDetails?email=${encodeURIComponent(session?.user?.email ?? "")}`),
                fetch(`/api/chapterDetails?email=${encodeURIComponent(session?.user?.email ?? "")}`),
                fetch(`/api/MCQDetails?email=${encodeURIComponent(session?.user?.email ?? "")}`),
            ]);

            const teacher = await teacherRes.json();
            console.log(teacher)
            const teacherDetails: ITeacher | null = teacher.teacherDetails;
            const classList = teacherDetails ? ([...teacherDetails.classList].sort((a, b) => Number(a) - Number(b))) : null;

            const chapter = await chapterRes.json();
            const chapterData: any[] = chapter.chapterDetails;

            const mcq = await mcqRes.json();
            const mcqData: IMCQ[] = mcq.MCQs;
            console.log(classList)
            setTeacherDetails(teacherDetails)
            setTeacherClassList(classList);
            setChapterDetails(chapterData);
            setMCQData(mcqData);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
        finally {
            setLoading(false)
        }
    };


    useEffect(() => {
        console.log(status, session)
        if (status != "authenticated" || !session) { setLoading(true); return }

        fetchData();
    }, [sessionTrue]);

    return (
        <DataContext.Provider value={{ teacherDetails, teacherClassList, chapterDetails, MCQData, loading, fetchData }
        }>
            {children}
        </DataContext.Provider>
    );
}

export function useAppData() {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error("useAppData must be used inside DataProvider");
    return ctx;
}
