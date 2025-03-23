import { useCallback, useEffect, useState } from "react";
import { Note } from "../types/Note";
import NotePreview from "../components/NotePreview";
import ConfirmationModal from "../components/ConfirmationModal";
import { Category } from "../types/Category";
import UpdateNoteModal from "../components/UpdateCreateNoteModal";
import { NoteUpdateDTO } from "../types/NoteUpdateDTO";
import { NoteCreateDTO } from "../types/NoteCreateDTO";
import { BiPlus } from "react-icons/bi";

interface Props {
  isArchivedNotes?: boolean;
}

function Notes({ isArchivedNotes = false }: Props) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<number | null>(null);
  const [noteToUpdate, setNoteToUpdate] = useState<Note | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  const openUpdateModal = (note: Note) => setNoteToUpdate(note);
  const closeUpdateModal = () => setNoteToUpdate(null);

  const openDeleteModal = (id: number) => setNoteToDelete(id);
  const closeDeleteModal = () => setNoteToDelete(null);

  const fetchNotes = useCallback(async () => {
    try {
      const categoryQuery = selectedCategory
        ? `&category=${selectedCategory}`
        : "";

      const response = await fetch(
        `http://localhost:3000/notes?archived=${isArchivedNotes}${categoryQuery}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const notes = await response.json();
      setNotes(notes);
    } catch {
      setError("Error fetching notes");
    }
  }, [isArchivedNotes, selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/categories");

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const categories = await response.json();
      setCategories(categories);
    } catch {
      setError("Error fetching categories");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchNotes(), fetchCategories()]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchNotes]);

  useEffect(() => {
    setSelectedCategory(null);
  }, [isArchivedNotes]);

  const handleUpdate = async (updatedNote: NoteUpdateDTO) => {
    try {
      const response = await fetch(
        `http://localhost:3000/notes/${updatedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedNote),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      fetchNotes();
      closeUpdateModal();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleCreate = async (newNote: NoteCreateDTO) => {
    try {
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      fetchNotes();
      closeCreateModal();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleArchive = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isArchived: !isArchivedNotes }),
      });

      if (!response.ok) {
        throw new Error("Failed to archive/unarchive the note");
      }

      fetchNotes();
    } catch (error) {
      console.error("Error archiving note:", error);
    }
  };

  const handleDeletion = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/notes/${noteToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the note");
      }

      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteToDelete)
      );
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleAddCategory = async (newCategory: string) => {
    try {
      const response = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newCategory }),
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const createdCategory = await response.json();
      setCategories((prev) => [...prev, createdCategory]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/categories/${categoryId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      setCategories((prev) =>
        prev.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="w-5/6 mx-auto">
      {(noteToUpdate || showCreateModal) && (
        <UpdateNoteModal
          mode={noteToUpdate ? "update" : "create"}
          note={noteToUpdate || undefined}
          categories={categories}
          onClose={noteToUpdate ? closeUpdateModal : closeCreateModal}
          onUpdate={handleUpdate}
          onCreate={handleCreate}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      )}
      {noteToDelete !== null && (
        <ConfirmationModal
          message="Are you sure you want to delete this note?"
          onConfirm={handleDeletion}
          onCancel={closeDeleteModal}
        />
      )}

      <div className="mb-4 flex justify-between items-end">
        <section>
          <label htmlFor="categoryFilter" className="block text-sm font-medium">
            Filter by Category:
          </label>
          <select
            id="categoryFilter"
            value={selectedCategory || ""}
            onChange={handleCategoryChange}
            className="w-fit p-2 border rounded text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </section>

        {!isArchivedNotes && (
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer flex gap-1 text-md justify-center items-center"
          >
            <BiPlus className="text-lg" />
            Add Note
          </button>
        )}
      </div>

      {!notes.length && (
        <p className="flex justify-center">No notes yet. Add some!</p>
      )}

      <div className="grid grid-cols-[repeat(auto-fit,_250px)] gap-4 mt-2 justify-between">
        {notes.map((note) => (
          <NotePreview
            isArchived={isArchivedNotes}
            note={note}
            handleArchive={handleArchive}
            openDeleteModal={openDeleteModal}
            openUpdateModal={openUpdateModal}
            key={note.id}
          />
        ))}
      </div>
    </section>
  );
}

export default Notes;
