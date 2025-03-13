import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/utils/cn/cn";

import InputDropdownItem from "./InputDropdownItem";

interface InputDropdownProps {
  buttonText: string;
  dropdownItems: { title: string; id: number }[];
  selectedItem: { title: string; id: number } | null;
  onSelect: (item: { id: number | null }) => void;
}

export default function InputDropdown({
  buttonText,
  dropdownItems,
  selectedItem,
  onSelect,
}: InputDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: { id: number } | null) => {
    onSelect(item ? item : { id: null });
    setIsOpen(false);
  };

  return (
    <div
      className="relative w-full text-sm font-normal sm:text-base"
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={toggleDropdown}
        className={cn(
          "border-box flex h-11 w-[calc(100vw-88px)] items-center justify-between rounded-xl bg-slate-50 px-5 text-slate-400",
          "hover:bg-slate-100 focus:outline-none sm:h-12 sm:w-full sm:max-w-[432px]",
          selectedItem && "text-slate-800",
        )}
      >
        {selectedItem ? selectedItem.title : buttonText}
        <img
          src="/icons/arrow-down.png"
          width={24}
          height={24}
          alt="arrow-down"
          className={cn(
            "transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="dropdown-scroll absolute z-50 mt-[1px] max-h-[calc(100vh-600px)] min-h-[130px] w-full overflow-hidden overflow-y-auto rounded-xl border border-slate-200 font-semibold shadow-lg sm:max-h-[calc(50vh-270px)]"
          >
            <ul>
              <InputDropdownItem onClick={() => handleSelect(null)}>
                {buttonText}
              </InputDropdownItem>
              {dropdownItems.map((item) => (
                <InputDropdownItem
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  selected={selectedItem?.id === item.id}
                >
                  {item.title}
                </InputDropdownItem>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
