import mongoose, { Schema, Document, model } from "mongoose";

export interface IClassCode {
    classID: string;
    classCode: string;
}


export interface ITeacher extends Document {
    name: string;
    email: string;
    classList: string[];
    classCodeList: IClassCode[] // e.g., ["8","9","10"]
}

const TeacherSchema = new Schema<ITeacher>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    classList: [{ type: String, required: true }],
    classCodeList: [
        {
            classID: { type: String, required: true },
            classCode: { type: String, required: true, unique: true }
        }
    ]

});

export default mongoose.models.Teacher || model<ITeacher>("Teacher", TeacherSchema);
