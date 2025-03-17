import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

import Button from "@/components/atoms/button/Button";
import Popup from "@/components/molecules/popup/Popup";
import { useDeleteNote } from "@/hooks/note/useDeleteNote";
import pageRoutes from "@/router/pageRoutes";

interface ActionBtnsProps {
  noteId: number;
}

/**
 * 노트 수정, 삭제 버튼
 */
function ActionBtns({ noteId }: ActionBtnsProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();
  const goalId = Number(router.query.goalId);
  const basePath = usePathname();
  const editPath = `${basePath}${pageRoutes.noteUpdate(noteId)}`;

  const { mutate } = useDeleteNote(goalId);
  const handleClickEdit = () => {
    router.push(editPath);
  };
  const handleClickDelete = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handlePopupConfirm = () => {
    mutate(noteId, {
      onSuccess: () => {
        router.push(basePath);
        handlePopupClose();
      },
    });
  };

  return (
    <div className="flex w-fit items-center justify-between gap-1">
      <Button
        onClick={handleClickEdit}
        variant={"outline"}
        rounded
        size="xs"
        className="h-8 w-16 text-slate-500 hover:text-slate-600 focus:text-slate-600"
      >
        수정
      </Button>
      <Button
        onClick={handleClickDelete}
        variant={"outline"}
        rounded
        size="xs"
        className="h-8 w-16 bg-white text-red-500 hover:text-red-600 focus:text-red-600"
      >
        삭제
      </Button>

      {/* 삭제 확인 모달 */}
      {isPopupOpen && (
        <Popup
          onConfirm={handlePopupConfirm}
          onClose={handlePopupClose}
          isCancelEnabled
        >
          <div>노트를 삭제하시겠어요?</div>
          <div>삭제된 노트는 복구할 수 없습니다.</div>
        </Popup>
      )}
    </div>
  );
}

export default ActionBtns;
