"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function NotesClients({ initialNotes }: { initialNotes: any[] }) {
  const [notes, setNotes] = useState(initialNotes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setLoading(true);
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    const result = await res.json();
   try {
    
       if (result.success) {
         setNotes((prev) => [result.data, ...prev]);
         toast.success("Note added!");
         setTitle("");
         setContent("");
       }
       setLoading(false);
   } catch (error) {
    console.log(error);
    toast.error("Failed to add note.");
    
   } 
   
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    setNotes((prev) => prev.filter((n) => n._id !== id));
    toast.success("Note deleted!");
  };

  const handleEdit = async (note: any) => {
    const title = prompt("Edit title", note.title);
    const content = prompt("Edit content", note.content);
    if (!title || !content) return;

    const res = await fetch(`/api/notes/${note._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    const result = await res.json();
    if (result.success) {
      setNotes((prev) =>
        prev.map((n) => (n._id === note._id ? result.data : n))
      );
        toast.success("Note updated!");
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Save Note"}
        </button>
      </form>

      {notes.map((note) => (
        <div key={note._id} className="border p-4 rounded">
          <h3 className="font-bold">{note.title}</h3>
          <p>{note.content}</p>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => handleEdit(note)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(note._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
