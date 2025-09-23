"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppData } from "@/store/DataProvider";

const Page = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { teacherDetails, loading } = useAppData();
    const dataCxt = useAppData(); // full context for effect dependency

    const [name, setName] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/signin");
            return;
        }
        if (status === "loading" || !session) return;

        setName(teacherDetails?.name ?? "");
    }, [dataCxt]);

    if (status === "loading" || loading) return <div>Loading</div>;

    return (
        <div className="flex justify-center items-center w-full h-full">
            Welcome {name}!
        </div>
    );
};

export default Page;
