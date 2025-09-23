
import type { Metadata } from "next";
import {
    mantineHtmlProps,
    MantineProvider,
} from "@mantine/core";
import theme from "./theme";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { MCQProvider } from "@/store/MCQProvider";
export const metadata: Metadata = {
    title: "EduMCQ",
    description: "Solve MCQs!",
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en"
            {...mantineHtmlProps}

        >
            <head>
                {/* <ColorSchemeScript
                    defaultColorScheme="auto"
                /> */}
            </head>
            <SessionWrapper>

                <body className="bg-white dark:bg-black w-full min-h-screen">
                    <MantineProvider

                        defaultColorScheme="light"
                        theme={theme}>
                        <MCQProvider>

                            <div className="bg-white dark:bg-black">

                                {children}
                            </div>
                        </MCQProvider>

                    </MantineProvider>

                </body>
            </SessionWrapper>
        </html >
    );
}
