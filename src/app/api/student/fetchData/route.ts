import connectDb from "@/db/connectDb";
import Chapter, { ChapterItem, IChapter } from "@/models/Chapter";
import MCQ from "@/models/MCQ";
import Teacher, { IClassCode } from "@/models/Teacher";

export async function GET(req: Request) {
    try {
        await connectDb();
        const { searchParams } = new URL(req.url);
        const classCode = searchParams.get("classCode");

        if (!classCode) return new Response(JSON.stringify({ success: false, message: "classCode required" }), { status: 400 });

        const teacher = await Teacher.findOne({ "classCodeList.classCode": classCode });
        if (!teacher) return new Response(JSON.stringify({ success: false, message: "Invalid class code" }), { status: 404 });

        const classObj = teacher.classCodeList.find((c: IClassCode) => c.classCode === classCode);
        const classID = classObj?.classID;
        const teacherEmail = teacher.email;

        const chapterDoc = await Chapter.findOne({ email: teacherEmail, classID }).lean<IChapter>();

        const mcqs = await MCQ.find({ email: teacherEmail, classID }).lean();

        // 3️⃣ Map MCQs to their chapters
        const result = chapterDoc?.chapters.map((chapter: ChapterItem) => {
            const chapterMCQs = mcqs
                .filter(mcq => mcq.chapterID === chapter.chapterID)
                .map(mcq => ({
                    mcqID: mcq.mcqID,
                    question: mcq.question,
                    options: mcq.options,
                    correctAnswer: mcq.correctAnswer,
                }));

            return {
                chapterID: chapter.chapterID,
                chapterName: chapter.chapterName,
                MCQs: chapterMCQs,
            };
        });
        return new Response(JSON.stringify({ success: true, message: "Fetched successfully", data: { classID, mcqs: result } }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, message: "Internal Server Error", data: null }), { status: 500 });
    }
}
