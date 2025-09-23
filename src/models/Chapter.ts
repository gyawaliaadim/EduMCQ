
import mongoose, { Schema, model, Document } from "mongoose";

export interface ChapterItem {
    chapterID: string;
    chapterName: string;
}

export interface IChapter extends Document {
    classID: string;         // safer than "class"
    chapters: ChapterItem[];
    email: string;
}

const ChapterSchema = new Schema<IChapter>({
    classID: { type: String, required: true },

    chapters: [
        {
            chapterID: { type: String, required: true },
            chapterName: { type: String, required: true },
        },
    ],


    email: { type: String, required: true },
});

ChapterSchema.index({ email: 1 }, { unique: true });

export default mongoose.models.Chapter ||
    model<IChapter>("Chapter", ChapterSchema);
