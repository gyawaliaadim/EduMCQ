import connectDb from "@/db/connectDb";
import Teacher, { IClassCode } from "@/models/Teacher";

export async function GET(req: Request) {
    try {
        await connectDb();
        const { searchParams } = new URL(req.url);
        const classCode = searchParams.get("classCode");

        if (!classCode) {
            return new Response(
                JSON.stringify({ success: false, message: "classCode is required", classID: null }),
                { status: 400 }
            );
        }

        const teacher = await Teacher.findOne({
            "classCodeList.classCode": classCode
        });
        if (!teacher) {
            return new Response(
                JSON.stringify({ success: false, message: "No teacher found with this classCode", classID: null }),
                { status: 404 }
            );
        }

        // Get the classID corresponding to the given classCode
        const classItem = teacher.classCodeList.find((c: IClassCode) => c.classCode === classCode);
        const classID = classItem?.classID ?? null;
        console.log("fetched data sucessfully", classID)

        return new Response(
            JSON.stringify({ success: true, message: "Fetched class code sucessfully", classID: classID }),
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal Server Error", classID: null }),
            { status: 500 }
        );
    }

}
