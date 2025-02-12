import { TodoResponse } from "@/types/todo";

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
      className: todo.noteId ? "" : "hidden group-hover:block cursor-pointer",
      onClick: todo.noteId
        ? () => onOpenNoteDetail(todo.noteId)
        : onOpenNoteModal,
      role: "button",
    },
    {
      src: "/round-kebab.png",
      alt: "수정,삭제",
      className: "hidden group-hover:block cursor-pointer",
      onClick: () => alert("수정/삭제 메뉴 열기"),
      role: "button",
    },
  ].filter(Boolean) as ActionOptions[];

  return (
    <ul className="flex gap-2">
      {actions.map(({ src, alt, className, onClick, role }, index) => (
        <li key={index} className={className} onClick={onClick} role={role}>
          <img src={src} alt={alt} width={24} height={24} />
        </li>
      ))}
    </ul>
  );
}
