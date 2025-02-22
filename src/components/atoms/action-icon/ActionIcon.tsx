import { useState } from "react";

import { TodoResponse } from "@/types/todo";
import { cn } from "@/utils/cn";

import Dropdown from "../dropdown/dropdown";

interface ActionIconProps {
  todo: TodoResponse["todos"][number];
  onOpenNoteDetail: (noteId: TodoResponse["todos"][number]["noteId"]) => void;
  onOpenTodoModal: () => void;
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
  onOpenNoteDetail,
  onOpenTodoModal,
}: ActionIconProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hoverIconStyle = `opacity-0 invisible -ml-6 mr-0 group-hover:opacity-100 group-hover:visible scale-90 group-hover:scale-100 group-hover:ml-0 group-hover:mr-2 hover:shadow-md transition-all duration-150 cursor-pointer ${isOpen ? "opacity-100 visible ml-0 mr-2 scale-100" : ""}`;
  const actions = [
    todo.fileUrl && {
      src: "/file.png",
      alt: "첨부파일",
    },
    todo.linkUrl && {
      src: "/link.png",
      alt: "첨부링크",
    },
    {
      src: todo.noteId ? "/note-view.png" : "/note-write.png",
      alt: todo.noteId ? "노트보기" : "노트작성",
      className: todo.noteId ? "" : hoverIconStyle,
      onClick: todo.noteId
        ? () => onOpenNoteDetail(todo.noteId)
        : () => alert("노트 작성 페이지"),
      role: "button",
    },
    {
      src: "/round-kebab.png",
      alt: "수정,삭제",
      className: hoverIconStyle,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      },
      role: "button",
    },
  ].filter(Boolean) as ActionOptions[];

  const dropdownItems = [
    { label: "수정하기", onClick: onOpenTodoModal },
    { label: "삭제하기", onClick: () => alert("삭제하기") },
  ];

  return (
    <ul className="relative flex flex-shrink-0 transition">
      {actions.map(({ src, alt, className, onClick, role }, index) => (
        <li
          key={index}
          className={cn("mr-2 rounded-full", className)}
          onClick={onClick}
          role={role}
        >
          <img src={src} alt={alt} width={24} height={24} />
        </li>
      ))}
      {isOpen && (
        <Dropdown
          items={dropdownItems}
          className="absolute top-[30px] right-2 z-10 min-w-[81px]"
        />
      )}
    </ul>
  );
}
