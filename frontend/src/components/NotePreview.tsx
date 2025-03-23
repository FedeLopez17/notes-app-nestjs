import {
  BiSolidBox,
  BiSolidPencil,
  BiSolidTrashAlt,
  BiUpload,
} from "react-icons/bi";
import { Note } from "../types/Note";
import { Link } from "react-router-dom";

interface Props {
  note: Note;
  isArchived: boolean;
  handleArchive: (id: number) => Promise<void>;
  openDeleteModal: (id: number) => void;
  openUpdateModal: (note: Note) => void;
}

function NotePreview(props: Props) {
  const { note, handleArchive, openDeleteModal, openUpdateModal, isArchived } =
    props;

  const formattedLastUpdateDate = new Date(note.updatedAt).toLocaleDateString(
    "en-GB"
  );

  const ArchiveUnarchiveIcon = isArchived ? BiUpload : BiSolidBox;
  const archiveUnarchiveTitle = isArchived ? "Unarchive" : "Archive";

  return (
    <Link to={`/notes/${note.id}`}>
      <section className=" w-full  flex flex-col gap-2 bg-blue-50 px-4 py-6 rounded-lg hover:shadow-xl transition-shadow">
        <section>
          <h2 className="font-bold text-sm">{note.title}</h2>
          <p className="opacity-80">Last updated: {formattedLastUpdateDate}</p>
        </section>
        <section className="flex gap-2 self-end">
          <ArchiveUnarchiveIcon
            className="cursor-pointer"
            title={archiveUnarchiveTitle}
            onClick={(e) => {
              e.preventDefault();
              handleArchive(note.id);
            }}
          />
          <BiSolidPencil
            className=" cursor-pointer"
            title="Update"
            onClick={(e) => {
              e.preventDefault();
              openUpdateModal(note);
            }}
          />
          <BiSolidTrashAlt
            className=" cursor-pointer"
            title="Delete"
            onClick={(e) => {
              e.preventDefault();
              openDeleteModal(note.id);
            }}
          />
        </section>
      </section>
    </Link>
  );
}

export default NotePreview;
