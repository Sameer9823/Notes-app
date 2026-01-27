import NotesClients from "@/components/NotesClients";
import connectDB from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  await connectDB();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Render notes here */}
        <div className=" p-4 rounded shadow">
          <NotesClients />
        </div>
      </div>
    </div>
  );
}
