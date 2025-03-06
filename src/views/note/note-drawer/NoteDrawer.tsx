import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";

import ExitBtn from "@/components/atoms/exit-btn/ExitBtn";
import Spinner from "@/components/atoms/spinner/Spinner";
import ErrorFallback from "@/components/molecules/error-fallback/ErrorFallback";
import BoundaryWrapper from "@/components/organisms/boundary-wrapper/BoundaryWrapper";
import { InputModalProvider } from "@/contexts/InputModalContext";

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
    <div className="fixed inset-0 z-20 bg-black/50">
      <section className="fixed inset-0 flex flex-col gap-4 bg-white p-6 sm:left-auto sm:w-[512px] sm:border-l sm:border-slate-200 md:w-[800px]">
        <ExitBtn onClick={handleClick} />
        <BoundaryWrapper>
          {mode === MODE.CREATE && <NoteCreationForm todoId={todoId} />}
          {mode === MODE.EDIT && <NoteUpdateForm noteId={noteId} />}
        </BoundaryWrapper>
      </section>
    </div>
  );
}
