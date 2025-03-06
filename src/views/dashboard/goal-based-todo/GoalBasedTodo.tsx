import Image from "next/image";

import PlusIcon from "@/components/atoms/plus-icon/PlusIcon";
import ProgressBar from "@/components/atoms/progress-bar/ProgressBar";
import TitleWithIcon from "@/components/atoms/title-with-icon/TitleWithIcon.tsx";
import { useModalContext } from "@/contexts/InputModalContext";
import { FilterType } from "@/types/todo";

import TodoWrapper from "./components/TodoWrapper";

interface GoalBasedTodoProps {
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  setSelectedTodoId: (id: number | null) => void;
  onOpenDeletePopup: (todoId: number) => void;
}

export default function GoalBasedTodo({
  handleToggleTodo,
  setSelectedTodoId,
  onOpenDeletePopup,
}: GoalBasedTodoProps) {
  const { openModal } = useModalContext();

  const handleClickAddTodo = () => {
    setSelectedTodoId(null);
    openModal();
  };

  const handleClickMore = () => {};

  return (
    <section className="rounded-xl bg-white p-6 transition-shadow duration-300 hover:shadow-2xl">
      <TitleWithIcon
        title="목표 별 할 일"
        imgUrl="/icons/flag-box.png"
        gap={8}
        className="text-lg font-semibold"
      />

      {/* 목표 리스트 */}
      <ul className="mt-4 flex flex-col gap-4">
        <li className="flex flex-col rounded-4xl bg-blue-50 p-6">
          {/* 목표제목, 할 일 추가 */}
          <div className="mb-2 flex justify-between">
            <h3 className="text-lg font-bold text-slate-800">목표 제목</h3>
            <button
              className="flex items-center justify-center gap-1 text-blue-500 hover:brightness-90"
              onClick={handleClickAddTodo}
            >
              <PlusIcon width={16} height={16} />
              <span className="text-sm font-semibold">할 일 추가</span>
            </button>
          </div>

          {/* 프로그래스바 */}
          <div className="flex items-center justify-center gap-2 rounded-[13px] border border-slate-100 bg-white px-[9px] py-[2px]">
            <ProgressBar progress={60} />
            <span className="text-xs font-semibold text-slate-900">60%</span>
          </div>

          {/*  할 일 리스트 */}
          <div className="my-4 flex flex-col gap-6 sm:flex-row">
            {["todo", "done"].map((doneStatus, idx) => (
              <TodoWrapper
                handleToggleTodo={handleToggleTodo}
                setSelectedTodoId={setSelectedTodoId}
                onOpenDeletePopup={onOpenDeletePopup}
                key={idx}
                goalId={1828} // 임시로 넣어둠
                doneStatus={doneStatus as FilterType}
              />
            ))}
          </div>

          {/* 더보기 */}
          <button
            onClick={handleClickMore}
            className="flex h-[32px] w-[120px] items-center justify-center self-center rounded-2xl bg-white transition hover:scale-105"
          >
            <span className="ml-3 text-sm font-semibold text-slate-700">
              자세히 보기
            </span>
            <Image
              src="/icons/ic_arrow_right.svg"
              alt={"arrow_right"}
              width={20}
              height={20}
              layout="fixed"
            />
          </button>
        </li>

        <li className="flex flex-col rounded-4xl bg-blue-50 p-6">
          {/* 목표제목, 할 일 추가 */}
          <div className="mb-2 flex justify-between">
            <h3 className="text-lg font-bold text-slate-800">목표 제목</h3>
            <button
              className="flex items-center justify-center gap-1 text-blue-500 hover:brightness-90"
              onClick={handleClickAddTodo}
            >
              <PlusIcon width={16} height={16} />
              <span className="text-sm font-semibold">할 일 추가</span>
            </button>
          </div>

          {/* 프로그래스바 */}
          <div className="flex items-center justify-center gap-2 rounded-[13px] border border-slate-100 bg-white px-[9px] py-[2px]">
            <ProgressBar progress={60} />
            <span className="text-xs font-semibold text-slate-900">60%</span>
          </div>

          {/*  할 일 리스트 */}
          <div className="my-4 flex flex-col gap-6 sm:flex-row">
            {["todo", "done"].map((doneStatus, idx) => (
              <TodoWrapper
                handleToggleTodo={handleToggleTodo}
                setSelectedTodoId={setSelectedTodoId}
                onOpenDeletePopup={onOpenDeletePopup}
                key={idx}
                goalId={1828} // 임시로 넣어둠
                doneStatus={doneStatus as FilterType}
              />
            ))}
          </div>

          {/* 더보기 */}
          <button
            onClick={handleClickMore}
            className="flex h-[32px] w-[120px] items-center justify-center self-center rounded-2xl bg-white transition hover:scale-105"
          >
            <span className="ml-3 text-sm font-semibold text-slate-700">
              자세히 보기
            </span>
            <Image
              src="/icons/ic_arrow_right.svg"
              alt={"arrow_right"}
              width={20}
              height={20}
              layout="fixed"
            />
          </button>
        </li>
      </ul>
    </section>
  );
}
