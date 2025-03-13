import { cn } from "@/utils/cn/cn";

interface InputDropdownItemProps {
  children: string;
  onClick?: () => void;
  selected?: boolean;
}

export default function InputDropdownItem({
  children,
  onClick,
  selected,
}: InputDropdownItemProps) {
  return (
    <li
      onClick={onClick}
      className={cn(
        "cursor-pointer bg-[#F9FAFB] px-4 py-[10px] font-normal text-slate-700 transition-all duration-200",
        "first:text-slate-400 hover:bg-[#E5E7EB] active:bg-blue-50",
        selected && "bg-blue-100 font-medium",
      )}
    >
      {children}
    </li>
  );
}
