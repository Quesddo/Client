import { useSearchParams } from "next/navigation";

import NoteCreationForm from "../note-form/NoteCreateForm";
import NoteUpdateForm from "../note-form/NoteUpdateForm";

const MODE = {
  DETAIL: "detail",
  CREATE: "create",
  EDIT: "edit",
} as const;

const getMode = ({
  isEditMode,
  noteId,
  todoId,
}: {
  isEditMode: boolean;
  noteId: number;
  todoId: number;
}) => {
  if (todoId >= 0) {
    return MODE.CREATE;
  } else if (noteId >= 0) {
    return isEditMode ? MODE.EDIT : null;
  } else {
    return null;
  }
};

export default function NoteDrawer() {
  const searchParams = useSearchParams();
  const todoId = +(searchParams.get("todoId") ?? NaN);
  const noteId = +(searchParams.get("noteId") ?? NaN);
  const isEditMode = searchParams.get("mode") === MODE.EDIT;
  const mode = getMode({ isEditMode, noteId, todoId });

  return (
    <>
      {mode === MODE.CREATE && <NoteCreationForm todoId={todoId} />}
      {mode === MODE.EDIT && <NoteUpdateForm noteId={noteId} />}
    </>
  );
}
