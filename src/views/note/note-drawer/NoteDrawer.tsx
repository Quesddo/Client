import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useMemo } from "react";

import ExitBtn from "@/components/atoms/exit-btn/ExitBtn";
import BoundaryWrapper from "@/components/organisms/boundary-wrapper/BoundaryWrapper";

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
  const mode = useMemo<(typeof MODE)[keyof typeof MODE] | null>(() => {
    if (todoId >= 0) {
      return MODE.CREATE;
    } else if (noteId >= 0) {
      return isEditMode ? MODE.EDIT : null;
    } else {
      return null;
    }
  }, [isEditMode, noteId, todoId]);

  const handleClick = () => {
    if (mode !== MODE.EDIT) {
      // 이전 창으로 이동
      router.push(pathname);
    } else {
      // TODO: 수정 시 동작
      router.push(pathname);
    }
  };

  if (!mode) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-20 flex justify-end bg-black/50">
      <div className="smd:grid-cols-[1fr_minmax(512px,_1fr)] grid grid-cols-1 bg-white md:max-w-none">
        <div className="flex h-10 items-center px-6">
          <ExitBtn onClick={handleClick} />
        </div>
        <section
          id="embed"
          className="smd:order-first smd:row-span-2 flex w-full items-center bg-amber-100"
        >
          <div className="h-[300px] w-full bg-amber-300"></div>
        </section>
        <section className="smd:max-w-[800px] smd:pt-0 box-border flex w-full flex-1 flex-col gap-4 overflow-hidden bg-white p-6">
          <BoundaryWrapper>
            {mode === MODE.CREATE && <NoteCreationForm todoId={todoId} />}
            {mode === MODE.EDIT && <NoteUpdateForm noteId={noteId} />}
          </BoundaryWrapper>
        </section>
      </div>
    </div>
  );
}
