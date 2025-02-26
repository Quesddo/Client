import { cn } from "@/utils/cn";

interface TodoCheckboxProps {
  checked: boolean;
  className?: string;
  checkedImgSrc?: string;
}

export function TodoCheckImg({
  checked,
  className,
  checkedImgSrc,
}: TodoCheckboxProps) {
  return (
    <img
      src={
        checked
          ? checkedImgSrc || "/icons/active-check.png"
          : "/icons/inactive-check.png"
      }
      alt={checked ? "체크됨" : "미체크"}
      width={18}
      height={18}
      className={cn("rounded-md hover:shadow-sm", className)}
    />
  );
}
