import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import ExitBtn from "@/components/atoms/exit-btn/ExitBtn";
import Popup from "@/components/molecules/popup/Popup";
import BoundaryWrapper from "@/components/organisms/boundary-wrapper/BoundaryWrapper";

import useBlockNavigation from "../../../hooks/note/useBlockNavigation";
import NoteCreationForm from "../note-form/NoteCreationForm";
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

  const { isPopupOpen, handleCanclePopup, handleConfirmPopup } =
    useBlockNavigation({
      isPageMoveRestricted: mode !== null,
    });

  const handleClick = () => {
    if (mode !== MODE.EDIT) {
      // 이전 창으로 이동
      router.push(pathname);
    } else {
      // TODO: 수정 시 동작
      router.push(pathname);
    }
  };

  return (
    <>
      {mode && (
        <div className="fixed inset-0 z-20 flex justify-end bg-black/50">
          <section className="box-border flex flex-col gap-4 overflow-y-auto bg-white p-6 sm:left-auto sm:w-[512px] sm:border-l sm:border-slate-200 md:w-[800px]">
            <ExitBtn onClick={handleClick} />
            <BoundaryWrapper>
              {mode === MODE.CREATE && <NoteCreationForm todoId={todoId} />}
              {mode === MODE.EDIT && <NoteUpdateForm noteId={noteId} />}
            </BoundaryWrapper>
          </section>
        </div>
      )}
      {isPopupOpen && (
        <Popup
          onClose={handleCanclePopup}
          onConfirm={handleConfirmPopup}
          isCancelEnabled
        >
          <p>정말 나가시겠어요?</p>
          <p>작성된 내용이 모두 삭제됩니다.</p>
        </Popup>
      )}
    </>
  );
}
