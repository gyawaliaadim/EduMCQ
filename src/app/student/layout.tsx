import Sidebar from "@/components/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full min-h-screen">
            {/* <StudentNavBar/> */}
            <Sidebar />
            <main className="sm:ml-48 ml-15 flex-1 p-4 w-full min-h-screen">
                {children}
            </main>
        </div>
    );
}
