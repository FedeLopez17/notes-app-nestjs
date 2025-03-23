import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Note } from "../types/Note";

function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await fetch(`http://localhost:3000/notes/${id}`);
        if (!response.ok) throw new Error("Note not found");
        const data: Note = await response.json();
        setNote(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    <section className="p-6 bg-white">
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <p className="mt-2">{note.content}</p>

      <div className="mt-4 text-sm text-gray-500">
        <p>
          Created At: {new Date(note.createdAt).toLocaleDateString("en-GB")}
        </p>
        <p>
          Last updated: {new Date(note.updatedAt).toLocaleDateString("en-GB")}
        </p>

        {note.categories && note.categories.length > 0 && (
          <div className="mt-2">
            <p>Categories:</p>
            <ul className="list-disc pl-6">
              {note.categories.map((category, index) => (
                <li key={index}>{category.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default NoteDetail;
