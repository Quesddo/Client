import Image from "next/image";
import { ReactNode, useState } from "react";

import Dropdown from "@/components/atoms/dropdown/dropdown";

const DROPDOWN_ITEMS = [
  { label: "수정하기", onClick: () => alert("수정하기") },
  { label: "삭제하기", onClick: () => alert("삭제하기") },
];

interface CardProps {
  children: ReactNode;
}

interface CardBodyProps {
  children: ReactNode;
}

interface CardTitleProps {
  children: ReactNode;
}

interface CardContentProps {
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
        <Dropdown
          items={DROPDOWN_ITEMS}
          className="absolute top-[58px] right-6"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      }
    </div>
  );
}

function CardBody({ children }: CardBodyProps) {
  return <div className="flex flex-col justify-start gap-3">{children}</div>;
}

function CardTitle({ children }: CardTitleProps) {
  return <h1 className="text-lg font-medium text-slate-800">{children}</h1>;
}

function CardDivider() {
  return <div className="h-[1px] bg-slate-200" />;
}

function CardContent({ children }: CardContentProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-sm bg-slate-100 px-[3px] py-[2px] text-xs font-medium text-slate-700">
        To do
      </div>
      <h2 className="text-xs font-normal text-slate-700">{children}</h2>
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Title = CardTitle;
Card.Divider = CardDivider;
Card.Content = CardContent;
