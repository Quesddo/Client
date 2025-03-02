import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import ActionDropdown from "@/components/atoms/action-dropdown/ActionDropdown";
import GoalItem from "@/components/atoms/goal-item/GoalItem";
import Input from "@/components/atoms/input/Input";
import { useGoalDetailContext } from "@/contexts/GoalDetailContext";
import { useDeleteGoal } from "@/hooks/goal/useDeleteGoal";
import { useFetchGoal } from "@/hooks/goal/useFetchGoal";
import { useUpdateGoal } from "@/hooks/goal/useUpdateGoal";
import meatBalls from "@public/icons/meatballs_menu.svg";

import Modal from "./Modal";
import ProgressContainer from "./ProgressContainer";

export default function GoalSection() {
  const { goalId } = useGoalDetailContext();

  const [isOpenActionDropDown, setIsOpenActionDropDown] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [action, setAction] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, isPending } = useFetchGoal(goalId);
  const { mutate: updateGoalName } = useUpdateGoal(goalId);
  const { mutate: deleteGoal } = useDeleteGoal(goalId);

  useEffect(() => {
    if (isPending) return;
  }, [isPending]);

  const handleClick = () => {
    setIsOpenActionDropDown(true);
  };

  const onClickCloseModal = () => {
    setIsOpenModal(false);
  };

  const onClickOpenModal = () => {
    setIsOpenModal(true);
  };

  const onClickUpdateGoalName = () => {
    updateGoalName(inputRef.current?.value as string);
    setIsOpenModal(false);
  };

  const onClickDeleteGoal = () => {
    deleteGoal();
  };

  if (isPending) return null;

  return (
    <>
      <div className="mb-[24px] flex justify-between">
        <GoalItem
          goal={data?.title}
          fontWeight="semibold"
          iconSize="lg"
          textSize="sm"
        />
        <Image
          src={meatBalls}
          alt="meat-balls"
          width={24}
          height={24}
          onClick={handleClick}
          className="cursor-pointer"
        />
        <ActionDropdown
          isOpen={isOpenActionDropDown}
          items={[
            {
              label: "수정하기",
              onClick: () => {
                onClickOpenModal();
                setIsOpenActionDropDown(() => false);
                setAction("update");
              },
            },
            {
              label: "삭제하기",
              onClick: () => {
                onClickOpenModal();
                setIsOpenActionDropDown(() => false);
                setAction("delete");
              },
            },
          ]}
          setIsOpen={setIsOpenActionDropDown}
          className="absolute top-[56px] right-6"
        />
      </div>
      <ProgressContainer />
      <Modal
        isOpen={isOpenModal}
        onClose={onClickCloseModal}
        onClick={
          action === "update" ? onClickUpdateGoalName : onClickDeleteGoal
        }
      >
        {action === "update" ? (
          <Input
            type="text"
            placeholder="수정 할 이름을 작성해주세요"
            ref={inputRef}
          />
        ) : (
          <>
            <p>목표를 삭제하시겠어요?</p>
            <p>삭제된 목표는 복구할 수 없습니다.</p>
          </>
        )}
      </Modal>
    </>
  );
}
