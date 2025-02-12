import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

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

const textVariants = cva(
  "font-normal cursor-pointer rounded-md p-2 hover:bg-gray-100",
  {
    variants: {
      size: {
        md: "text-lg",
        sm: "text-sm",
      },
    },
  },
);

interface DropdownProps
  extends Required<VariantProps<typeof dropdownVariants>> {
  className?: string;
  items: { label: string; onClick: () => void }[];
}

function Dropdown({ size, className, items }: DropdownProps) {
  return (
    <div className={cn(dropdownVariants({ size }), className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={cn(textVariants({ size }))}
          onClick={item.onClick}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

export default Dropdown;
