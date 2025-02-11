import { cn } from "@/utils/cn";

interface TodoTitleProps {
  title: string;
  done: boolean;
}

export function TodoTitle({ title, done }: TodoTitleProps) {
  return <span className={cn(done ? "line-through" : "")}>{title}</span>;
}
