import { cva, type VariantProps } from "class-variance-authority";

import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, Dispatch, SetStateAction } from "react";

import { cn } from "@/utils/cn/cn";
import type { Variants } from "framer-motion";

// 애니메이션 설정
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

// 스타일 설정
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

export interface ActionDropdownProps
  extends VariantProps<typeof dropdownStyleVariants> {
  items: { label: string; onClick: () => void }[];
  className?: string;
  style?: CSSProperties;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ActionDropdown({
  size,
  items,
  className,
  style,
  isOpen,
  setIsOpen,
}: ActionDropdownProps) {
  const closeDropdown = () => setIsOpen(false);
  const handleClickItem = (onClickItem: () => void) => {
    return () => {
      // 드롭다운 메뉴 클릭 시 지정된 onClick이 작동하고 드롭다운 닫힘
      closeDropdown();
      onClickItem();
    };
  };

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
              "relative z-2 flex w-fit flex-col rounded-xl bg-white text-slate-700 shadow-lg",
              className,
            )}
            style={style}
          >
            {items.map((item, idx) => (
              <li
                key={idx}
                className={cn(dropdownStyleVariants({ size }))}
                onClick={handleClickItem(item.onClick)}
              >
                {item.label}
              </li>
            ))}
          </motion.ul>

          {/* dropdown 외부를 덮고있는 레이어 (드롭다운 외부 클릭 시 닫혀야 함) */}
          <div
            data-testid="dropdown-overlay"
            className="fixed inset-0 z-1 bg-transparent"
            onClick={closeDropdown}
          />
        </>
      )}
    </AnimatePresence>
  );
}
