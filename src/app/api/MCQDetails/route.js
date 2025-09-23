// "use server"

import connectDb from "@/db/connectDb"
import MCQ from "@/models/MCQ";
export async function GET(req) {
    try {
        await connectDb();

        // Get query parameters from the URL
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        const MCQs = await MCQ.find({ email: email })
        console.log(MCQs)
        if (MCQs) {
            return new Response(
                JSON.stringify({ success: true, message: "MCQs Available", MCQs: MCQs }),
                { status: 200 }
            );
        } else {
            return new Response(
                JSON.stringify({ success: false, message: "No MCQs", MCQs: null }),
                { status: 404 }
            );
        }
    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal Server Error", MCQs: null }),
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        await connectDb();
        const body = await req.json();
        console.log(body)
        const { email, mcqID } = body;
        // Update or create Chapter document
        const updatedMCQs = await MCQ.findOneAndUpdate(
            { email, mcqID }, // filter by className
            { $set: body }, // update fields
            { upsert: true, new: true } // create if not exist & return updated doc
        );
        // Update Teacher document
        // const teacherResponse = await Teacher.findOne({ email })
        // const teacher = teacherResponse.toObject()
        // if (teacher) {
        //     console.log(teacher)
        //     // Avoid duplicate entries in addedSubjectsTo
        //     const updatedClasses = [...teacher.addedSubjectsTo, className];

        //     await Teacher.findOneAndUpdate(
        //         { email },
        //         { $set: { addedSubjectsTo: updatedClasses } },
        //         { new: true }
        //     );
        // }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Successful",
                MCQs: updatedMCQs,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Internal Server Error",
                newData: null,
            }),
            { status: 500 }
        );
    }
}
