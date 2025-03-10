import { useInView } from "react-intersection-observer";

import TitleWithIcon from "@/components/atoms/title-with-icon/TitleWithIcon.tsx";
import { useInfiniteGoals } from "@/hooks/goal/useInfiniteGoals";

import EmptyData from "./components/EmptyData";
import GoalItem from "./components/GoalItem";

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
  const { data, hasNextPage } = useInfiniteGoals();
  const { inView, ref: inViewRef } = useInView();

  // 목표가 하나도 없는 경우 예외처리
  const hasGoals = data && data.goals.length > 0;
  // 목표 데이터 파싱
  const goals = data ? data.goals : [];

  return (
    <section className="rounded-xl bg-white p-6 transition-shadow duration-300 hover:shadow-2xl">
      {/* 목표별 할 일 타이틀 */}
      <TitleWithIcon
        title="목표 별 할 일"
        imgUrl="/icons/flag-box.png"
        gap={8}
        className="text-lg font-semibold"
      />

      {hasGoals ? (
        <ul className="mt-4 flex flex-col gap-4">
          {goals.map((goal) => (
            <GoalItem
              goal={goal}
              key={goal.id}
              handleToggleTodo={handleToggleTodo}
              setSelectedTodoId={setSelectedTodoId}
              onOpenDeletePopup={onOpenDeletePopup}
            />
          ))}
        </ul>
      ) : (
        <EmptyData type="goal" />
      )}

      {/* 목표 리스트 */}
    </section>
  );
}
