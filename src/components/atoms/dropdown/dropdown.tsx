import { cva, type VariantProps } from "class-variance-authority";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import { cn } from "@/utils/cn";

const dropdownMotionVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const dropdownStyleVariants = cva(
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

interface DropdownProps extends VariantProps<typeof dropdownStyleVariants> {
  items: { label: string; onClick: () => void }[];
  className?: string;
}

export default function Dropdown({ size, items, className }: DropdownProps) {
  return (
    <motion.ul
      ref={dropdownRef}
      variants={dropdownMotionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={cn(
        "z-10 flex w-fit flex-col rounded-xl bg-white text-slate-700 shadow-lg",
        className,
      )}
    >
      {items.map((item, idx) => (
        <li
          key={idx}
          className={cn(dropdownStyleVariants({ size }))}
          onClick={item.onClick}
        >
          {item.label}
        </li>
      ))}
    </motion.ul>
  );
}
