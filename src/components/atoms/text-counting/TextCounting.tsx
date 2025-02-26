import { cn } from "@/utils/cn";

export default function TextCounting({
  count,
  total,
  className,
}: {
  count: number;
  total: number;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "rounded bg-white/50 px-1 py-0.5 text-xs font-medium",
        className,
      )}
    >
      {count}/<span className="text-blue-500">{total}</span>
    </p>
  );
}
