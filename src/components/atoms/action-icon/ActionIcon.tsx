import { TodoResponse } from "@/types/todo";
import { cn } from "@/utils/cn";

interface ActionIconProps {
  todo: TodoResponse["todos"][number];
  onOpenNoteDetail: (noteId: TodoResponse["todos"][number]["noteId"]) => void;
  onOpenNoteModal: () => void;
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
  onOpenNoteModal,
}: ActionIconProps) {
  const hoverIconStyle =
    "opacity-0 invisible -ml-6 mr-0 group-hover:opacity-100 group-hover:visible scale-90 group-hover:scale-100 group-hover:ml-0 group-hover:mr-2 hover:shadow-md transition-all duration-150 cursor-pointer";
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
        : onOpenNoteModal,
      role: "button",
    },
    {
      src: "/round-kebab.png",
      alt: "수정,삭제",
      className: hoverIconStyle,
      onClick: () => alert("수정/삭제 메뉴 열기"),
      role: "button",
    },
  ].filter(Boolean) as ActionOptions[];

  return (
    <ul className="flex flex-shrink-0 transition">
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
    </ul>
  );
}
