import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

import { cn } from "@/utils/cn";

const dropdownMenus = ["수정하기", "삭제하기"];

const dropdownVariants = cva(
  "flex w-fit flex-col gap-3 rounded-xl text-slate-700 shadow-lg z-10 bg-white",
  {
    variants: {
      size: {
        md: "py-2 px-[21.5px]",
        sm: "py-2 px-4",
      },
    },
  },
);

const textVariants = cva("font-normal", {
  variants: {
    size: {
      md: "text-lg",
      sm: "text-sm",
    },
  },
});

// variants 속성들을 props로 필수로 받도록 함
interface DropdownProps
  extends Required<VariantProps<typeof dropdownVariants>> {
  className?: string;
}

function Dropdown({ size, className }: DropdownProps) {
  return (
    <div className={cn(dropdownVariants({ size }), className)}>
      {dropdownMenus.map((menu, idx) => (
        <Link href={"#"} className={cn(textVariants({ size }))} key={idx}>
          {menu}
        </Link>
      ))}
    </div>
  );
}

export default Dropdown;
