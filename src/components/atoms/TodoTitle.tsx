import { cn } from "@/utils/cn";

interface TodoTitleProps {
  title: string;
  done: boolean;
}

export function TodoTitle({ title, done }: TodoTitleProps) {
  return (
    <span
      className={cn(
        "transition-all duration-150 group-hover:text-blue-500",
        done ? "line-through" : "",
      )}
    >
      {title}
    </span>
  );
}
