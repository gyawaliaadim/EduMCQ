// "use server"

import connectDb from "@/db/connectDb"
import Chapter from "@/models/Chapter";

export async function GET(req) {
    try {
        await connectDb();

        // Get query parameters from the URL
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        const chapter = await Chapter.find({ email: email })
        console.log(chapter)
        if (chapter) {
            return new Response(
                JSON.stringify({ success: true, message: "Chapters Available", chapterDetails: chapter }),
                { status: 200 }
            );
        } else {
            return new Response(
                JSON.stringify({ success: false, message: "No Chapters", chapterDetails: null }),
                { status: 404 }
            );
        }
    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal Server Error", chapterDetails: null }),
            { status: 500 }
        );
    }
}



export async function POST(req) {
    try {
        await connectDb();
        const body = await req.json();
        const { email, classID } = body;
        console.log(body)
        // Update or create Chapter document

        const updatedChapter = await Chapter.findOneAndUpdate(
            { classID, email },   // filter
            { $set: body } ,       // update
            { upsert: true, new: true } // options
        );


        console.log("class is " + classID)

        return new Response(
            JSON.stringify({
                success: true,
                message: "Successful",
                teacherDetails: updatedChapter,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Internal Server Error",
                teacherDetails: null,
            }),
            { status: 500 }
        );
    }
}
