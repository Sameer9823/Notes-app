import NotesClients from "@/components/NotesClients";
import connectDB from "@/lib/db";
import Note from "@/models/Note";
import Image from "next/image";

async function fetchNotes() {
  await connectDB();
  const notes = await Note.find().sort({ createdAt: -1 }).lean();
  return notes.map((note) => ({
    ...note,
    _id: note._id.toString(),
  }));
}

export default async function Home() {
  const notes = await fetchNotes();
  // console.log(notes);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Render notes here */}
        <div className=" p-4 rounded shadow">
          <NotesClients initialNotes={notes} />
        </div>
      </div>
    </div>
  );
}
