import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // ✅ auto createdAt & updatedAt
  }
);

export default mongoose.models.Note ||
  mongoose.model("Note", NoteSchema);
