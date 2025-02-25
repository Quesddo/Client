import { cn } from "@/utils/cn";

interface TodoChipProps {
  isDone?: boolean;
  className?: string;
}
export default function TodoChip({ isDone, className }: TodoChipProps) {
  return (
    <div
      className={cn(
        "flex h-[20px] w-[37px] items-center justify-center rounded-sm bg-slate-100 text-xs font-medium text-slate-700",
        className,
      )}
    >
      {isDone ? "Done" : "To do"}
    </div>
  );
}
