import { useState } from "react";
import { Note } from "../types/Note";
import { Category } from "../types/Category";
import { NoteUpdateDTO } from "../types/NoteUpdateDTO";
import { NoteCreateDTO } from "../types/NoteCreateDTO";

interface Props {
  mode: "create" | "update";
  note?: Note;
  categories: Category[];
  onClose: () => void;
  onUpdate?: (updatedNote: NoteUpdateDTO) => void;
  onCreate?: (updatedNote: NoteCreateDTO) => void;
  onAddCategory: (newCategory: string) => void;
  onDeleteCategory: (categoryId: number) => void;
}

const UpdateCreateNoteModal = ({
  mode,
  note,
  categories,
  onClose,
  onUpdate,
  onCreate,
  onAddCategory,
  onDeleteCategory,
}: Props) => {
  const [title, setTitle] = useState<string>(note?.title || "");
  const [content, setContent] = useState<string>(note?.content || "");
  const [isArchived, setIsArchived] = useState<boolean>(
    note?.isArchived || false
  );
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    note?.categories || []
  );
  const [newCategory, setNewCategory] = useState<string>("");

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSelectCategory = (category: Category) => {
    if (
      !selectedCategories.some(
        (selectedCategory) => selectedCategory.id === category.id
      )
    ) {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    onDeleteCategory(categoryId);
  };

  const handleUnselectCategory = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.filter((selectedCategory) => selectedCategory.id !== category.id)
    );
  };

  const handleSaveNote = (event: React.FormEvent) => {
    event.preventDefault();

    const noteData: NoteCreateDTO = {
      title,
      content,
      isArchived,
      categories: selectedCategories.map((category) => category.id),
    };

    if (mode === "update" && onUpdate && note) {
      onUpdate({ ...noteData, id: note.id } as NoteUpdateDTO);
    } else if (mode === "create" && onCreate) {
      onCreate(noteData);
    }

    onClose();
  };

  return (
    <section
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <section
        className="bg-white p-6 rounded shadow-md max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl mb-4">
          {mode === "create" ? "Add Note" : "Update Note"}
        </h2>

        <form onSubmit={handleSaveNote}>
          <section className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </section>

          <section className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium">
              Content:
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
              required
            />
          </section>

          <section className="mb-4 flex gap-4">
            <section>
              <h3 className="text-lg mb-2">Available Categories</h3>
              {categories
                .filter(
                  (category) =>
                    !selectedCategories.some(
                      (selectedCategory) => selectedCategory.id === category.id
                    )
                )
                .map((category) => (
                  <section
                    key={category.id}
                    className="flex items-center justify-between"
                  >
                    <p>{category.title}</p>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleSelectCategory(category)}
                      className="p-2 bg-gray-200 rounded mr-2"
                    >
                      Select
                    </button>
                  </section>
                ))}
            </section>

            <section>
              <h3 className="text-lg mb-2">Selected Categories</h3>
              {selectedCategories.map((category) => (
                <section key={category.id} className="flex items-center">
                  <span className="mr-2">{category.title}</span>
                  <button
                    onClick={() => handleUnselectCategory(category)}
                    className="p-2 bg-orange-500 text-white rounded"
                  >
                    Unselect
                  </button>
                </section>
              ))}
            </section>
          </section>

          <section className="mb-4">
            <label htmlFor="newCategory" className="block text-sm font-medium">
              New Category:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="newCategory"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter new category"
              />
              <button
                onClick={handleAddCategory}
                className="p-2 bg-green-500 text-white rounded"
              >
                Add
              </button>
            </div>
          </section>

          <section className="mb-4">
            <label htmlFor="isArchived" className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isArchived"
                checked={isArchived}
                onChange={() => setIsArchived(!isArchived)}
              />
              Archive this note
            </label>
          </section>

          <section className="flex gap-4 justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {mode === "create" ? "Add" : "Save Changes"}
            </button>
          </section>
        </form>
      </section>
    </section>
  );
};

export default UpdateCreateNoteModal;
