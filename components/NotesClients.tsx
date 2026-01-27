"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Note = {
  _id: string;
  title: string;
  content: string;
};

export default function NotesClients({ initialNotes }: { initialNotes: Note[] }) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  /* ---------------- CREATE ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setLoading(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const result = await res.json();

      if (result.success) {
        setNotes((prev) => [result.data, ...prev]);
        toast.success("Note added!");
        setTitle("");
        setContent("");
      } else {
        toast.error("Failed to add note.");
      }
    } catch (error) {
      toast.error("Failed to add note.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/notes/${id}`, { method: "DELETE" });
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted!");
    } catch {
      toast.error("Failed to delete note.");
    }
  };

  /* ---------------- EDIT ---------------- */

  const startEdit = (note: Note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const saveEdit = async (id: string) => {
    if (!editTitle || !editContent) return;

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setNotes((prev) =>
          prev.map((n) => (n._id === id ? result.data : n))
        );
        toast.success("Note updated!");
        cancelEdit();
      } else {
        toast.error("Failed to update note.");
      }
    } catch {
      toast.error("Failed to update note.");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">
      {/* CREATE FORM */}
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

      {/* NOTES LIST */}
      {notes.map((note) => (
        <div key={note._id} className="border p-4 rounded space-y-2">
          {editingId === note._id ? (
            <>
              <input
                className="border p-2 w-full"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="border p-2 w-full"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className="space-x-2">
                <button
                  onClick={() => saveEdit(note._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-bold">{note.title}</h3>
              <p>{note.content}</p>
              <div className="space-x-2">
                <button
                  onClick={() => startEdit(note)}
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
            </>
          )}
        </div>
      ))}
    </div>
  );
}
