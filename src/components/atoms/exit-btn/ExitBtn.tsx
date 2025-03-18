import Image from "next/image";

import { cn } from "@/utils/cn/cn";

interface ExitBtnProps {
  onClick: () => void;
  className?: string;
}
export default function ExitBtn({ onClick, className }: ExitBtnProps) {
  return (
    <Image
      src="/icons/delete.png"
      alt="exit-button"
      width={24}
      height={24}
      className={cn("cursor-pointer hover:brightness-50", className)}
      onClick={onClick}
    />
  );
}
