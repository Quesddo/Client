import { ChangeEvent, useState } from "react";
import { createPortal } from "react-dom";

import Input from "@/components/atoms/input/Input";
import { useDeleteGoal } from "@/hooks/goal/useDeleteGoal";
import { useUpdateGoal } from "@/hooks/goal/useUpdateGoal";

import GoalPopup from "../component/GoalPopup";

interface GoalTitleModalsProps {
  goalId: number;
  actionType: "update" | "delete";
  onClose: () => void;
  title: string | undefined;
}

export default function GoalTitleModals({
  goalId,
  actionType,
  onClose,
  title,
}: GoalTitleModalsProps) {
  const [value, setValue] = useState<string>(title ?? "");
  const [error, setError] = useState<boolean>(false);
  const { mutate: updateGoalName } = useUpdateGoal(goalId);
  const { mutate: deleteGoal } = useDeleteGoal(goalId);

  const onUpdateGoal = () => {
    if (!error) {
      updateGoalName(value);
      onClose();
    }
  };

  const onDeleteGoal = () => {
    deleteGoal();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setError(newValue.trim() === "");
    setValue(newValue);
  };

  return createPortal(
    <GoalPopup
      onClose={onClose}
      onConfirm={actionType === "update" ? onUpdateGoal : onDeleteGoal}
      isCancelEnabled={true}
    >
      {actionType === "update" ? (
        <>
          <label htmlFor="goal-name" className="mb-1 block text-left">
            목표이름 수정
          </label>
          <Input
            id="goal-name"
            type="text"
            placeholder="수정 할 이름을 작성해주세요 ✏️"
            value={value}
            onChange={handleChange}
          />
          {error && (
            <p className="mt-[8px] ml-[16px] text-red-700">
              공백 문자는 입력이 불가능합니다
            </p>
          )}
        </>
      ) : (
        <>
          <p>목표를 삭제하시겠어요?</p>
          <p>삭제된 목표는 복구할 수 없습니다.</p>
        </>
      )}
    </GoalPopup>,
    document.body,
  );
}
