import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ExitBtn from "@/components/atoms/exit-btn/ExitBtn";

import NoteCreationForm from "../note-form/NoteCreationForm";
import NoteUpdateForm from "../note-form/NoteUpdateForm";

const MODE = {
  DETAIL: "detail",
  CREATE: "create",
  EDIT: "edit",
} as const;

export default function NoteDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const todoId = +(searchParams.get("todoId") ?? NaN);
  const noteId = +(searchParams.get("noteId") ?? NaN);
  const isEditMode = searchParams.get("mode") === MODE.EDIT;
  const [mode, setMode] = useState<(typeof MODE)[keyof typeof MODE] | null>(
    null,
  );

  const handleClick = () => {
    if (mode !== MODE.EDIT) {
      // 이전 창으로 이동
      router.push(pathname);
    } else {
      // TODO: 수정 시 동작
    }
  };

  useEffect(() => {
    if (todoId >= 0) {
      setMode(MODE.CREATE);
    } else if (noteId >= 0) {
      setMode(isEditMode ? MODE.EDIT : MODE.DETAIL);
    } else {
      setMode(null);
    }
  }, [isEditMode, noteId, todoId]);

  if (!mode) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-20 bg-black/50">
      <section className="fixed inset-0 bg-white p-6 sm:left-auto sm:w-[512px] sm:border-l sm:border-slate-200 md:w-[800px]">
        <ExitBtn onClick={handleClick} />
        {mode === MODE.CREATE && <NoteCreationForm />}
        {mode === MODE.EDIT && <NoteUpdateForm noteId={noteId} />}
      </section>
    </div>
  );
}
