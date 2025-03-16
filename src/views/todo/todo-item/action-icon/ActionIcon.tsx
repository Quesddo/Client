import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

import pageRoutes from "@/router/pageRoutes";
import { TeamIdTodosGet200Response } from "@/types/types";
import { cn } from "@/utils/cn/cn";

import { TodoActionDropdown } from "../action-dropdown/TodoActionDropdown";

interface ActionIconProps {
  todo: TeamIdTodosGet200Response["todos"][number];
  onOpenTodoModal: (todoId: number) => void;
  onOpenDeletePopup: (todoId: number) => void;
  isTouched: boolean;
}

interface ActionOptions {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  role?: string;
}

export function ActionIcon({
  todo,
  onOpenTodoModal,
  onOpenDeletePopup,
  isTouched,
}: ActionIconProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const actionRef = useRef<HTMLUListElement>(null);

  const handleNoteDetail = () => {
    router.push(`${pathname}${pageRoutes.noteDetail(todo.noteId as number)}`);
  };
  const handleNoteCreation = () => {
    router.push(`${pathname}${pageRoutes.noteCreate(todo.id)}`);
  };

  const handleOpenUrl = (url: string | null) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const hoverIconStyle = `hover-icon-style opacity-0 invisible -ml-6 group-hover:opacity-100 group-hover:visible group-hover:ml-0 hover:shadow-md transition-all duration-150 ${(isOpen || isTouched) && "opacity-100 visible ml-0"}`;
  const actions = [
    todo.fileUrl && {
      src: "/icons/file.png",
      alt: "첨부파일",
      onClick: () => handleOpenUrl(todo.fileUrl),
    },
    todo.linkUrl && {
      src: "/icons/link.png",
      alt: "첨부링크",
      onClick: () => handleOpenUrl(todo.linkUrl),
    },
    {
      src: todo.noteId ? "/icons/note-view.png" : "/icons/note-write.png",
      alt: todo.noteId ? "노트보기" : "노트작성",
      className: todo.noteId ? "" : hoverIconStyle,
      onClick: todo.noteId ? handleNoteDetail : handleNoteCreation,
      role: "button",
    },
    {
      src: "/icons/kebab.png",
      alt: "수정,삭제",
      className: hoverIconStyle,
      onClick: handleToggleDropdown,
      role: "button",
    },
  ].filter(Boolean) as ActionOptions[];

  const dropdownItems = [
    { label: "수정하기", onClick: () => onOpenTodoModal(todo.id) },
    {
      label: "삭제하기",
      onClick: () => {
        onOpenDeletePopup(todo.id);
      },
    },
  ];

  return (
    <ul ref={actionRef} className="relative flex flex-shrink-0 transition">
      {actions.map(({ src, alt, className, onClick, role }, index) => {
        const nextItem = actions[index + 1];
        const isBeforeHoverIcon =
          nextItem && nextItem.className?.includes("hover-icon-style");
        return (
          <li
            key={index}
            className={cn(
              "cursor-pointer rounded-full",
              className,
              isBeforeHoverIcon ? "mr-0 group-hover:mr-2" : "mr-2 last:mr-0",
              (isOpen || isTouched) && "mr-2",
            )}
            onClick={onClick}
            role={role}
          >
            <img src={src} alt={alt} width={24} height={24} />
          </li>
        );
      })}

      <TodoActionDropdown
        isOpen={isOpen}
        items={dropdownItems}
        onClose={setIsOpen}
        anchorRef={actionRef}
      />
    </ul>
  );
}
