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

  const res = await fetch('http://localhost:3000/api/timers', { cache: 'force-cache',
  next: { revalidate: 10,
    tags: ['timer  ']
   }
   });
  const data = await res.json();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Render notes here */}
        <div className=" p-4 rounded shadow">
          <NotesClients initialNotes={notes} />
        </div>
      </div>
      <hr className="my-8" />

      <div className="p-4 rounded shadow border mt-8">

      <h1 className="text-2xl font-bold mb-4">Nextjs Response </h1>
      <p className="mb-2">Time: {data.time}</p>
      <p className="mb-2">Readable: {data.readable}</p>
      <p className="mb-2">Unix: {data.unix}</p>
      <p className="mb-2">UTC: {data.utc}</p>
      <p className="mb-2">Message: {data.message}</p>
      <p className="mb-2">Request ID: {data.requestId}</p>
      </div>
    </div>
  );
}
