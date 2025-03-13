import Image from "next/image";
import { useRef, useState } from "react";

import ActionDropdown from "@/components/atoms/action-dropdown/ActionDropdown";
import GoalItem from "@/components/atoms/goal-item/GoalItem";
import Input from "@/components/atoms/input/Input";
import { useDeleteGoal } from "@/hooks/goal/useDeleteGoal";
import { useFetchGoal } from "@/hooks/goal/useFetchGoal";
import { useUpdateGoal } from "@/hooks/goal/useUpdateGoal";
import { useGoalDetailContext } from "@/views/goal/GoalDetailContext";
import meatBalls from "@public/icons/meatballs-menu.svg";

import Modal from "./Modal";

export default function GoalTitle() {
  const { goalId } = useGoalDetailContext();

  const [isOpenActionDropDown, setIsOpenActionDropDown] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const actionRef = useRef<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data } = useFetchGoal(goalId);
  const { mutate: updateGoalName } = useUpdateGoal(goalId);
  const { mutate: deleteGoal } = useDeleteGoal(goalId);

  const onClickUpdateGoalName = () => {
    updateGoalName(inputRef.current?.value as string);
    setIsOpenModal(false);
  };

  const actionDropdownArr = [
    {
      label: "수정하기",
      onClick: () => {
        setIsOpenModal(true);
        setIsOpenActionDropDown(false);
        actionRef.current = "update";
      },
    },
    {
      label: "삭제하기",
      onClick: () => {
        setIsOpenModal(true);
        setIsOpenActionDropDown(false);
        actionRef.current = "delete";
      },
    },
  ];

  return (
    <>
      <div className="flex h-[64px] justify-between pb-[24px]">
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
          onClick={() => setIsOpenActionDropDown(true)}
          className="cursor-pointer"
        />
        <ActionDropdown
          isOpen={isOpenActionDropDown}
          items={actionDropdownArr}
          setIsOpen={setIsOpenActionDropDown}
          className="absolute top-[56px] right-6"
        />
      </div>
      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onClick={
          actionRef.current === "update" ? onClickUpdateGoalName : deleteGoal
        }
      >
        {actionRef.current === "update" ? (
          <>
            <label htmlFor="goal-name" className="mb-2 inline-block">
              목표
            </label>
            <Input
              id="goal-name"
              type="text"
              placeholder="수정 할 이름을 작성해주세요"
              ref={inputRef}
            />
          </>
        ) : (
          <div className="text-center">
            <p>목표를 삭제하시겠어요?</p>
            <p>삭제된 목표는 복구할 수 없습니다.</p>
          </div>
        )}
      </Modal>
    </>
  );
}
