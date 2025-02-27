import Image from "next/image";
import { Dispatch, ReactNode, SetStateAction } from "react";

import { cn } from "@/utils/cn";

interface ExitBtnProps {
  onClick: () => void;
}
export function ExitBtn({ onClick }: ExitBtnProps) {
  return (
    <Image
      src="/icons/delete.png"
      alt="exit-button"
      width={24}
      height={24}
      layout="fixed"
      className={"cursor-pointer"}
      onClick={onClick}
    />
  );
}
interface GoalWrapper {
  goal?: string;
}
export function GoalWrapper({ goal }: GoalWrapper) {
  return (
    <div className={"flex gap-[6px]"}>
      <Image
        src="/icons/flag-goal.png"
        alt="flag-goal"
        width={24}
        height={24}
        layout="fixed"
      />
      <span className="text-base font-medium text-slate-800">{goal}</span>
    </div>
  );
}

interface TodoChipProps {
  isDone?: boolean;
}
export function TodoChip({ isDone }: TodoChipProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-sm text-xs font-medium text-slate-700",
      )}
    >
      {isDone ? "Done" : "To do"}
    </div>
  );
}

export function Divider() {
  return <div className="h-[1px] bg-slate-200" />;
}
