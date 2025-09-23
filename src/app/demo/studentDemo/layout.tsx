
import Sidebar from "@/components/demo/SideBar";
import Link from "next/link";
import Image from "next/image";
export default function Layout({ children }: { children: React.ReactNode }) {


    return (
        <div className="flex w-full min-h-screen">
            {/* <StudentNavBar/> */}
            <Sidebar />
            <main className="sm:ml-48 ml-20 flex-1 p-4 w-full min-h-screen">
                {children}
            </main>
        </div>
    );
}
