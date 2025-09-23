// "use server"

import connectDb from "@/db/connectDb"
import Teacher from "@/models/Teacher"
import { IClassCode } from "@/models/Teacher";

async function generateUniqueClassCode() {
    let code;
    let exists= true;
    while (exists) {
        code = Math.random().toString(36).substring(2, 8); // 6-character code
        exists = await Teacher.findOne({ "classCodeList.classCode": code });
    }
    return code;
}


export async function GET(req) {
    try {
        await connectDb();

        // Get query parameters from the URL
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        if (!email) {
            return new Response(
                JSON.stringify({ success: false, message: "Email is required", teacherDetails: null }),
                { status: 400 }
            );
        }

        const teacher = await Teacher.findOne({ email: email });
        console.log(teacher)
        if (teacher) {
            return new Response(
                JSON.stringify({ success: true, message: "Teacher found", teacherDetails: teacher }),
                { status: 200 }
            );
        } else {
            return new Response(
                JSON.stringify({ success: false, message: "Teacher not found", teacherDetails: null }),
                { status: 404 }
            );
        }
    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal Server Error", teacherDetails: null }),
            { status: 500 }
        );
    }
} export async function POST(req) {
    try {
        await connectDb();
        const body = await req.json();

        if (!body.email || !body.classList) {
            return new Response(
                JSON.stringify({ success: false, message: "Email and classList required", teacherDetails: null }),
                { status: 400 }
            );
        }

        let teacher = await Teacher.findOne({ email: body.email });

        // If teacher doesn't exist, create a new one with empty classCodeList
        if (!teacher) {
            teacher = new Teacher({
                name: body.name ?? "",
                email: body.email,
                classList: body.classList,
                classCodeList: [],
                addedSubjectsTo: [],
            });
        }

        // Remove any classCodeList items not present in the new classList
        const updatedClassCodeList = (teacher.classCodeList ?? []).filter((c) =>
            body.classList.includes(c.classID)
        );
        console.log("updatedClassList", updatedClassCodeList);

        // Add new codes for classes in the new list that don't have a code yet
        for (const cls of body.classList) {
            if (!updatedClassCodeList.find((c) => c.classID === cls)) {
                const newCode = await generateUniqueClassCode();
                updatedClassCodeList.push({ classID: cls, classCode: newCode });
            }
        }


        teacher.name = body.name ?? teacher.name;
        teacher.classList = body.classList;
        teacher.classCodeList = updatedClassCodeList;

        const updatedTeacher = await teacher.save();
        console.log("updatedTeacher = ", updatedTeacher);

        return new Response(
            JSON.stringify({ success: true, message: "Profile updated successfully", teacherDetails: updatedTeacher }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal Server Error", teacherDetails: null }),
            { status: 500 }
        );
    }
}
