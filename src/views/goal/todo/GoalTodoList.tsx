import PlusIcon from "@/components/atoms/plus-icon/PlusIcon";
import TodoList from "@/components/organisms/todo-list/TodoList";
import { useGoalDetailContext } from "@/contexts/GoalDetailContext";
import { useTodos } from "@/hooks/todo/useTodos";

import Section from "../component/Section";

interface GoalTodoListProps {
  handleClick: () => void;
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  setSelectedTodoId: (todoId: number | null) => void;
  onOpenDeletePopup: () => void;
}

export default function GoalTodoList({
  handleClick,
  handleToggleTodo,
  setSelectedTodoId,
  onOpenDeletePopup,
}: GoalTodoListProps) {
  const { goalId } = useGoalDetailContext();

  const { data } = useTodos(goalId);
  const todos = data.todos;

  return (
    <Section className="flex-1 bg-white hover:shadow">
      <div className="mb-[16px] flex justify-between">
        <p className="text-lg font-bold">To do</p>
        <button
          onClick={handleClick}
          className="flex items-center gap-1 text-sm font-semibold text-blue-500"
        >
          <PlusIcon width={16} height={16} />
          할일 추가
        </button>
      </div>
      <div className="h-[168px] overflow-x-hidden overflow-y-auto pr-4 md:h-[512px]">
        {todos?.length ? (
          <TodoList
            data={todos}
            handleToggleTodo={handleToggleTodo}
            setSelectedTodoId={setSelectedTodoId}
            onOpenDeletePopup={onOpenDeletePopup}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-normal text-slate-500">
            해야할 일이 아직 없어요
          </div>
        )}
      </div>
    </Section>
  );
}
