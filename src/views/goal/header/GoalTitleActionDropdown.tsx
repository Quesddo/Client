import { Dispatch, SetStateAction } from "react";

import ActionDropdown from "@/components/atoms/action-dropdown/ActionDropdown";

interface GoalTitleActionDropdownProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onUpdateClick: () => void;
  onDeleteClick: () => void;
}

export default function GoalTitleActionDropdown({
  isOpen,
  setIsOpen,
  onUpdateClick,
  onDeleteClick,
}: GoalTitleActionDropdownProps) {
  const actionDropdownItems = [
    {
      label: "수정하기",
      onClick: onUpdateClick,
    },
    {
      label: "삭제하기",
      onClick: onDeleteClick,
    },
  ];

  return (
    <ActionDropdown
      isOpen={isOpen}
      items={actionDropdownItems}
      setIsOpen={setIsOpen}
      className="absolute top-[56px] right-6"
    />
  );
}
