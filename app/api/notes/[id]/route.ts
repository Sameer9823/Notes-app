import connectDB from "@/lib/db";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params
    await connectDB();
    await Note.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params
    const body = await req.json();

    await connectDB();
    const updated = await Note.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json({
      success: true,
      data: {
        ...updated!.toObject(),
        _id: updated!._id.toString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Update failed" },
      { status: 500 }
    );
  }
}
