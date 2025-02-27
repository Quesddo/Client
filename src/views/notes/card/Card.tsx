import Image from "next/image";
import { ReactNode, useState } from "react";

import ActionDropdown from "@/components/atoms/action-dropdown/ActionDropdown";
import Divider from "@/components/atoms/divider/Divider";
import TodoChip from "@/components/atoms/todo-chip/TodoChip";

const DROPDOWN_ITEMS = [
  { label: "수정하기", onClick: () => alert("수정하기") },
  { label: "삭제하기", onClick: () => alert("삭제하기") },
];

interface CardProps {
  children: ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="relative flex flex-col gap-4 rounded-xl bg-white p-6">
      {children}
    </div>
  );
}

function CardHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <Image
        src="/icons/note-list.png"
        alt="note-list"
        width={28}
        height={28}
      />
      <Image
        src="/icons/kebab.png"
        alt="edit or delete toggle"
        width={24}
        height={24}
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      {
        <ActionDropdown
          items={DROPDOWN_ITEMS}
          className="absolute top-[58px] right-6"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      }
    </div>
  );
}

function CardBody({ children }: CardProps) {
  return <div className="flex flex-col justify-start gap-3">{children}</div>;
}

function CardTitle({ children }: CardProps) {
  return <h1 className="text-lg font-medium text-slate-800">{children}</h1>;
}

function CardContent({ children }: CardProps) {
  return <div className="flex items-center gap-2">{children}</div>;
}

function CardTodoTitle({ children }: CardProps) {
  return <h2 className="text-xs font-normal text-slate-700">{children}</h2>;
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Title = CardTitle;
Card.Divider = Divider;
Card.Content = CardContent;
Card.todoChip = TodoChip;
Card.TodoTitle = CardTodoTitle;
