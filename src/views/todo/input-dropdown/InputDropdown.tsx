import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/utils/cn";

import InputDropdownItem from "./InputDropdownItem";

interface InputDropdownProps {
  buttonText: string;
  dropdownItems: { title: string; id: number }[];
  selectedItem: { title: string; id: number } | null;
  onSelect: (item: { id: number | null }) => void;

  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export default function InputDropdown({
  buttonText,
  dropdownItems,
  selectedItem,
  onSelect,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: InputDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

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

  // 무한 스크롤 로직
  useEffect(() => {
    if (!isOpen || !loadMoreRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          fetchNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );
    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isOpen, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
            className="dropdown-scroll absolute z-50 mt-[1px] max-h-[calc(100vh-600px)] min-h-[130px] w-full overflow-hidden overflow-y-auto rounded-xl border border-slate-200 font-semibold shadow-lg sm:max-h-[calc(100vh-710px)]"
          >
            <ul>
              <InputDropdownItem
                onClick={() => {
                  onSelect({ id: null });
                  setIsOpen(false);
                }}
              >
                {buttonText}
              </InputDropdownItem>
              {dropdownItems.map((item, index) => (
                <InputDropdownItem
                  key={index}
                  onClick={() => {
                    onSelect(item);
                    setIsOpen(false);
                  }}
                >
                  {item.title}
                </InputDropdownItem>
              ))}
              {hasNextPage && (
                <div
                  ref={loadMoreRef}
                  className="py-2 text-center text-slate-500"
                />
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
