import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import ExitBtn from "@/components/atoms/exit-btn/ExitBtn";
import BoundaryWrapper from "@/components/organisms/boundary-wrapper/BoundaryWrapper";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const todoId = +(searchParams.get("todoId") ?? NaN);
  const noteId = +(searchParams.get("noteId") ?? NaN);
  const isEditMode = searchParams.get("mode") === MODE.EDIT;
  const mode = getMode({ isEditMode, noteId, todoId });

  const handleClick = () => {
    router.push(pathname);
  };

  return (
    <>
      {mode && (
        <div className="fixed inset-0 z-20 flex justify-end bg-black/50">
          <section className="box-border flex w-full flex-col gap-4 overflow-y-auto bg-white p-6 sm:left-auto sm:w-[512px] sm:border-l sm:border-slate-200 md:w-[800px]">
            <ExitBtn onClick={handleClick} />
            <BoundaryWrapper>
              {mode === MODE.CREATE && <NoteCreationForm todoId={todoId} />}
              {mode === MODE.EDIT && <NoteUpdateForm noteId={noteId} />}
            </BoundaryWrapper>
          </section>
        </div>
      )}
    </>
  );
}
