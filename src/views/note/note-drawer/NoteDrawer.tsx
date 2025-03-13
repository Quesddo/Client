import { useSearchParams } from "next/navigation";

import NoteDetail from "../note-detail/NoteDetail";
import NoteCreateForm from "../note-form/NoteCreateForm";
import NoteUpdateForm from "../note-form/NoteUpdateForm";

const MODE = {
  DETAIL: "detail",
  CREATE: "create",
  EDIT: "edit",
} as const;

const getMode = ({
  mode,
  noteId,
  todoId,
}: {
  mode: string | null;
  noteId: number;
  todoId: number;
}) => {
  if (todoId >= 0) {
    return MODE.CREATE;
  }

  if (
    noteId >= 0 &&
    mode &&
    [MODE.DETAIL, MODE.EDIT].includes(mode as "detail" | "edit")
  ) {
    return mode;
  }

  return null;
};

export default function NoteDrawer() {
  const searchParams = useSearchParams();
  const todoId = +(searchParams.get("todoId") ?? NaN);
  const noteId = +(searchParams.get("noteId") ?? NaN);
  const searchParamMode = searchParams.get("mode");
  const mode = getMode({ mode: searchParamMode, noteId, todoId });

  return (
    <>
      {mode === MODE.CREATE && <NoteCreateForm todoId={todoId} />}
      {mode === MODE.EDIT && <NoteUpdateForm noteId={noteId} />}
      {mode === MODE.DETAIL && <NoteDetail />}
    </>
  );
}
