import { cn } from "@/utils/cn";

interface DividerProps {
  className?: string;
}

/**
 *
 * 기본적으로 bg-slate-200, h-[1px] 스타일이 적용됩니다. 두께나 색상을 변경하려면 className을 통해 직접 스타일을 지정해주세요.
 */
export default function Divider({ className }: DividerProps) {
  return <div className={cn("h-[1px] bg-slate-200", className)} />;
}
