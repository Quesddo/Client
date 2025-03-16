import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

import ActionDropdown from "@/components/atoms/action-dropdown/ActionDropdown";
import Popup from "@/components/molecules/popup/Popup";
import { useDeleteNote } from "@/hooks/note/useDeleteNote";
import pageRoutes from "@/router/pageRoutes";

interface EditDeleteBtnsProps {
  noteId: number;
}

function EditDeleteBtns({ noteId }: EditDeleteBtnsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const dropdownItems = [
    {
      label: "수정하기",
      onClick: handleClickEdit,
    },
    { label: "삭제하기", onClick: handleClickDelete },
  ];

  return (
    <div className="flex w-fit items-center justify-between">
      {/* kebab 아이콘 */}
      <Image
        src="/icons/kebab.png"
        alt="edit or delete toggle"
        width={24}
        height={24}
        className="cursor-pointer rounded-full border border-slate-300 transition-all hover:border-slate-500 hover:shadow-md"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />

      {/* 수정/삭제 드롭다운 */}
      <ActionDropdown
        items={dropdownItems}
        className="absolute top-8 left-0"
        isOpen={isDropdownOpen}
        setIsOpen={setIsDropdownOpen}
      />

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

export default EditDeleteBtns;
