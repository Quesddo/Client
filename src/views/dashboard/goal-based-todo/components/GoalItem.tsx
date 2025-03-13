import Image from "next/image";
import { useRouter } from "next/router";

import PlusIcon from "@/components/atoms/plus-icon/PlusIcon";
import { useTodoListActionContext } from "@/contexts/TodoListActionContext";
import { FilterType } from "@/types/todo";
import { TeamIdGoalsGet200ResponseGoalsInner } from "@/types/types";

import ProgressWrapper from "./ProgressBar";
import TodoWrapper from "./TodoWrapper";

interface GoalItemProps {
  goal: TeamIdGoalsGet200ResponseGoalsInner;
}

export default function GoalItem({ goal }: GoalItemProps) {
  const router = useRouter();
  const { onOpenCreateModal } = useTodoListActionContext();

  // 자세히보기 버튼 클릭 => 목표상세로 이동
  const handleClickMore = (goalId: number) => {
    router.push(`/goal/${goalId}`);
  };

  return (
    <li className="flex min-h-[300px] flex-col rounded-4xl bg-blue-50 p-6">
      {/* 목표제목, 할 일 추가 */}
      <div className="mb-2 flex justify-between">
        <h3 className="text-lg font-bold text-slate-800">{goal.title}</h3>
        <button
          className="flex items-center justify-center gap-1 text-blue-500 hover:brightness-90"
          onClick={() => onOpenCreateModal(goal.id)}
        >
          <PlusIcon width={16} height={16} />
          <span className="text-sm font-semibold">할일추가</span>
        </button>
      </div>

      {/* 프로그래스바 */}
      <ProgressWrapper goalId={goal.id} />

      {/*  할 일 리스트 */}
      <div className="my-4 flex grow flex-col gap-6 sm:flex-row">
        {["todo", "done"].map((doneStatus, idx) => (
          <TodoWrapper
            key={idx}
            goalId={goal.id}
            doneStatus={doneStatus as FilterType}
          />
        ))}
      </div>

      {/* 더보기 */}
      <button
        onClick={() => handleClickMore(goal.id)}
        className="mt-[12px] flex h-[32px] w-[120px] items-center justify-center self-center rounded-2xl bg-white transition hover:scale-105"
      >
        <span className="ml-3 text-sm font-semibold text-slate-700">
          자세히 보기
        </span>
        <Image
          src="/icons/arrow-right.svg"
          alt={"arrow_right"}
          width={20}
          height={20}
          layout="fixed"
        />
      </button>
    </li>
  );
}
