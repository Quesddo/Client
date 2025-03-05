import { cn } from "@/utils/cn";

import { TodoCheckImg } from "./TodoCheckImg";

interface TodoCheckboxProps {
  checked: boolean;
  onToggle: (e: React.MouseEvent) => void;
  className?: string;
  checkedImgSrc?: string;
}

export function TodoCheckbox({
  checked,
  onToggle,
  className,
  checkedImgSrc,
}: TodoCheckboxProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "mr-2 flex flex-shrink-0 cursor-pointer items-center p-[3px]",
        className,
      )}
    >
      <TodoCheckImg checked={checked} checkedImgSrc={checkedImgSrc} />
    </button>
  );
}
