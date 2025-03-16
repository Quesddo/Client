import { Dispatch, RefObject, SetStateAction, useMemo } from "react";
import { createPortal } from "react-dom";

import ActionDropdown from "@/components/atoms/action-dropdown/ActionDropdown";

interface TodoActionDropdownProps {
  isOpen: boolean;
  items: { label: string; onClick: () => void }[];
  onClose: Dispatch<SetStateAction<boolean>>;
  anchorRef: RefObject<HTMLUListElement | null>;
}

export function TodoActionDropdown({
  isOpen,
  items,
  onClose,
  anchorRef,
}: TodoActionDropdownProps) {
  const position = useMemo(() => {
    if (!isOpen || !anchorRef.current) return { top: 0, left: 0 };

    const rect = anchorRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY + 2,
      left: rect.right + window.scrollX - 81,
    };
  }, [isOpen, anchorRef]);

  if (!isOpen) return null;

  return createPortal(
    <ActionDropdown
      items={items}
      className="z-50 min-w-[81px]"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        position: "absolute",
      }}
      isOpen={isOpen}
      setIsOpen={onClose}
    />,
    document.body,
  );
}
