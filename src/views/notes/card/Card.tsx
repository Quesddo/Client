import Image from "next/image";
import { useRouter } from "next/router";
import { PropsWithChildren, useState } from "react";

import ActionDropdown from "@/components/atoms/action-dropdown/ActionDropdown";
import Divider from "@/components/atoms/divider/Divider";
import TodoChip from "@/components/atoms/todo-chip/TodoChip";
import Popup from "@/components/molecules/popup/Popup";
import { useDeleteNote } from "@/hooks/note/useDeleteNote";
import pageRoutes from "@/router/pageRoutes";

interface CardTitleProps extends PropsWithChildren {
  noteId: number;
}

interface CardHeaderProps {
  noteId: number;
}

export default function Card({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col gap-4 rounded-xl bg-white p-6">
      {children}
    </div>
  );
}

function CardHeader({ noteId }: CardHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();
  const goalId = Number(router.query.goalId);
  const editPath = `${router.asPath}${pageRoutes.noteUpdate(noteId)}`;

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
    <div className="flex items-center justify-between">
      <Image
        src="/icons/note-list.png"
        alt="note-list"
        width={28}
        height={28}
      />

      {/* kebab 아이콘 */}
      <Image
        src="/icons/kebab.png"
        alt="edit or delete toggle"
        width={24}
        height={24}
        className="cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />

      {/* 수정/삭제 드롭다운 */}
      <ActionDropdown
        items={dropdownItems}
        className="absolute top-[58px] right-6"
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

function CardBody({ children }: PropsWithChildren) {
  return <div className="flex flex-col justify-start gap-3">{children}</div>;
}

function CardTitle({ children, noteId }: CardTitleProps) {
  const router = useRouter();
  return (
    <span
      className="cursor-pointer text-lg font-medium text-slate-800"
      // 노트 상세 사이드바 띄우기
      onClick={() => {
        router.push(
          `${router.asPath.split("?")[0]}${pageRoutes.noteDetail(noteId)}`,
        );
      }}
    >
      {children}
    </span>
  );
}

function CardContent({ children }: PropsWithChildren) {
  return <div className="flex items-center gap-2">{children}</div>;
}

function CardTodoTitle({ children }: PropsWithChildren) {
  return <h2 className="text-xs font-normal text-slate-700">{children}</h2>;
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Title = CardTitle;
Card.Divider = Divider;
Card.Content = CardContent;
Card.todoChip = TodoChip;
Card.TodoTitle = CardTodoTitle;
