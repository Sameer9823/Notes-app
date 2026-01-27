import { kMaxLength } from "buffer";
import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true, kMaxLength: 100 },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

});

NoteSchema.pre("save", function (this: any, next: any) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);