import mongoose, { Schema, Document, model } from "mongoose";

export interface IMCQ extends Document {
    chapterID: string;
    email: string;
    question: string;
    options: { A: string; B: string; C: string; D: string };
    correctAnswer: "A" | "B" | "C" | "D";
    classID: string;
    mcqID: Number
}

const MCQSchema = new Schema<IMCQ>({
    chapterID: { type: String, ref: "Chapter", required: true },
    question: { type: String, required: true },
    options: {
        A: { type: String, required: true },
        B: { type: String, required: true },
        C: { type: String, required: true },
        D: { type: String, required: true },
    },
    correctAnswer: { type: String, enum: ["A", "B", "C", "D"], required: true },
    email: { type: String, required: true },
    classID: { type: String, required: true },
    mcqID: { type: Number, unique: true, required: true }
});

export default mongoose.models.MCQ || model<IMCQ>("MCQ", MCQSchema);
