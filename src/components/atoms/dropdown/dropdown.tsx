import { cva, type VariantProps } from "class-variance-authority";

import { animate, AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

import { cn } from "@/utils/cn";
import type { Variants } from "framer-motion";

const dropdownMotionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
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
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Dropdown({
  size,
  items,
  className,
  isOpen,
  setIsOpen,
}: DropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.ul
            variants={dropdownMotionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={cn(
              "z-2 flex w-fit flex-col rounded-xl bg-white text-slate-700 shadow-lg",
              className,
            )}
            onClick={() => {
              setIsOpen(false);
            }}
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

          <div
            className="fixed inset-0 z-1 bg-transparent"
            onClick={() => {
              // 배경 클릭 시 닫힘
              setIsOpen(false);
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
