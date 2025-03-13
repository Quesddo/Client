import { useRef } from "react";
import { createPortal } from "react-dom";

import Input from "@/components/atoms/input/Input";
import { useDeleteGoal } from "@/hooks/goal/useDeleteGoal";
import { useUpdateGoal } from "@/hooks/goal/useUpdateGoal";

import GoalPopup from "../component/GoalPopup";

interface GoalTitleModalsProps {
  goalId: number;
  actionType: "update" | "delete";
  onClose: () => void;
}

export default function GoalTitleModals({
  goalId,
  actionType,
  onClose,
}: GoalTitleModalsProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateGoalName } = useUpdateGoal(goalId);
  const { mutate: deleteGoal } = useDeleteGoal(goalId);

  const onUpdateGoal = () => {
    if (inputRef.current?.value) {
      updateGoalName(inputRef.current.value);
      onClose();
    }
  };

  const onDeleteGoal = () => {
    deleteGoal();
  };

  const ModalContent = () => {
    if (actionType === "update") {
      return (
        <>
          <label htmlFor="goal-name" className="mb-1 block text-left">
            목표이름 수정
          </label>
          <Input
            id="goal-name"
            type="text"
            placeholder="수정 할 이름을 작성해주세요 ✏️"
            ref={inputRef}
          />
        </>
      );
    }

    return (
      <>
        <p>목표를 삭제하시겠어요?</p>
        <p>삭제된 목표는 복구할 수 없습니다.</p>
      </>
    );
  };

  return createPortal(
    <GoalPopup
      onClose={onClose}
      onConfirm={actionType === "update" ? onUpdateGoal : onDeleteGoal}
      isCancelEnabled={true}
    >
      <ModalContent />
    </GoalPopup>,
    document.body,
  );
}
