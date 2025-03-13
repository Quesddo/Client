import Image from "next/image";
import { useRef, useState } from "react";

import GoalItem from "@/components/atoms/goal-item/GoalItem";
import { useFetchGoal } from "@/hooks/goal/useFetchGoal";
import { useGoalDetailContext } from "@/views/goal/GoalDetailContext";
import meatBalls from "@public/icons/meatballs-menu.svg";

import GoalTitleActionDropdown from "./GoalTitleActionDropdown";
import GoalTitleModals from "./GoalTitleModals";

export default function GoalTitle() {
  const { goalId } = useGoalDetailContext();
  const { data, isLoading } = useFetchGoal(goalId);
  const [isOpenActionDropDown, setIsOpenActionDropDown] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const actionRef = useRef<"update" | "delete">("update");

  if (isLoading) return;

  const handleOpenUpdateModal = () => {
    actionRef.current = "update";
    setIsOpenModal(true);
    setIsOpenActionDropDown(false);
  };

  const handleOpenDeleteModal = () => {
    actionRef.current = "delete";
    setIsOpenModal(true);
    setIsOpenActionDropDown(false);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

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
        <GoalTitleActionDropdown
          isOpen={isOpenActionDropDown}
          setIsOpen={setIsOpenActionDropDown}
          onUpdateClick={handleOpenUpdateModal}
          onDeleteClick={handleOpenDeleteModal}
        />
      </div>

      {isOpenModal && (
        <GoalTitleModals
          goalId={goalId}
          actionType={actionRef.current}
          onClose={handleCloseModal}
          title={data?.title}
        />
      )}
    </>
  );
}
