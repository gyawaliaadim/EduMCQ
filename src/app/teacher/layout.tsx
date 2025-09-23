// app/layout.tsx or pages/_app.tsx
import Drawer from "@/components/Drawer";
import { DataProvider } from "@/store/DataProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <DataProvider>
            <div className="flex w-full min-h-screen">
                <Drawer />
                <main className="sm:ml-48 ml-20 flex-1 p-4 w-full min-h-screen">
                    {children}
                </main>
            </div>
        </DataProvider>
    );
}
