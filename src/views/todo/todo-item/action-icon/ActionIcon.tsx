import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import ActionDropdown from "@/components/atoms/action-dropdown/ActionDropdown";
import { TodoResponse } from "@/types/todo";
import { cn } from "@/utils/cn/cn";

interface ActionIconProps {
  todo: TodoResponse["todos"][number];
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
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const actionRef = useRef<HTMLUListElement>(null);

  const handleNoteDetail = () => {
    router.push(`${pathname}?noteId=${todo.noteId}&mode=detail`);
  };
  const handleNoteCreation = () => {
    router.push(`${pathname}?todoId=${todo.id}`);
  };

  const hoverIconStyle = `hover-icon-style opacity-0 invisible -ml-6 group-hover:opacity-100 group-hover:visible group-hover:ml-0 hover:shadow-md transition-all duration-150 ${(isOpen || isTouched) && "opacity-100 visible ml-0"}`;
  const actions = [
    todo.fileUrl && {
      src: "/icons/file.png",
      alt: "첨부파일",
      onClick: () => {
        if (todo.fileUrl)
          window.open(todo.fileUrl, "_blank", "noopener,noreferrer");
      },
    },
    todo.linkUrl && {
      src: "/icons/link.png",
      alt: "첨부링크",
      onClick: () => {
        if (todo.linkUrl)
          window.open(todo.linkUrl, "_blank", "noopener,noreferrer");
      },
    },
    {
      src: todo.noteId ? "/icons/note-view.png" : "/icons/note-write.png",
      alt: todo.noteId ? "노트보기" : "노트작성",
      className: todo.noteId ? "" : hoverIconStyle,
      onClick: todo.noteId
        ? () => handleNoteDetail()
        : () => handleNoteCreation(),
      role: "button",
    },
    {
      src: "/icons/kebab.png",
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
    { label: "수정하기", onClick: () => onOpenTodoModal(todo.id) },
    {
      label: "삭제하기",
      onClick: () => {
        onOpenDeletePopup(todo.id);
      },
    },
  ];

  // 드롭다운 위치 계산
  useEffect(() => {
    if (isOpen && actionRef.current) {
      const rect = actionRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 2,
        left: rect.right + window.scrollX - 81,
      });
    }
  }, [isOpen]);

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

      {createPortal(
        <ActionDropdown
          items={dropdownItems}
          className="z-50 min-w-[81px]"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            position: "absolute",
          }}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />,
        document.body,
      )}
    </ul>
  );
}
