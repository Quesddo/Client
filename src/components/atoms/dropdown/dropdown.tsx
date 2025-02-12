import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const dropdownVariants = cva(
  "font-normal cursor-pointer m-auto rounded-lg hover:bg-gray-200",
  {
    variants: {
      size: {
        sm: "text-sm py-2 px-4",
        md: "text-lg py-2 px-[21.5px]",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

interface DropdownProps extends VariantProps<typeof dropdownVariants> {
  items: { label: string; onClick: () => void }[];
  className?: string;
}

export default function Dropdown({ size, items, className }: DropdownProps) {
  return (
    <div
      className={cn(
        "flex w-fit flex-col rounded-xl bg-white text-slate-700 shadow-lg",
        className,
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className={cn(dropdownVariants({ size }))}
          onClick={item.onClick}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
