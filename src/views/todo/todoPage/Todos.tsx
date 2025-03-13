import { memo, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import Spinner from "@/components/atoms/spinner/Spinner";
import TodoList from "@/components/organisms/todo-list/TodoList";
import { useInfiniteTodo } from "@/hooks/todo/useInfiniteTodo";
import { cn } from "@/utils/cn/cn";

export const FILTER_TYPES = ["All", "Done", "To do"] as const;

const EMPTY_MESSAGE: Record<(typeof FILTER_TYPES)[number], string> = {
  All: "등록한 일이 없어요",
  Done: "다 한 일이 아직 없어요",
  "To do": "해야할 일이 아직 없어요",
};

interface TodosProps {
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  onOpenDeletePopup: (todoId: number) => void;
}

export default memo(function Todos({
  handleToggleTodo,
  onOpenDeletePopup,
}: TodosProps) {
  const [filter, setFilter] = useState<(typeof FILTER_TYPES)[number]>("All");

  const { ref: inViewRef, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteTodo();

  const filteredTodos = (data?.todos ?? []).filter((todo) => {
    if (filter === "Done") return todo.done;
    if (filter === "To do") return !todo.done;
    return true;
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="mb-4 flex h-full flex-grow flex-col rounded-xl bg-white p-4 sm:mb-6 sm:max-w-[588px] sm:p-6 md:max-w-[744px]">
      <div>
        {FILTER_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={cn(
              "mr-2 mb-4 rounded-full border border-slate-200 px-3 py-1 text-sm font-medium hover:shadow-sm",
              filter === type && "border-blue-500 bg-blue-500 text-white",
            )}
          >
            {type}
            {filter === type && ` (${filteredTodos.length})`}
          </button>
        ))}
      </div>

      {filteredTodos.length > 0 ? (
        <>
          <TodoList
            data={filteredTodos}
            handleToggleTodo={handleToggleTodo}
            onOpenDeletePopup={onOpenDeletePopup}
            isShowGoal={true}
            isNew={true}
          />
          {isFetchingNextPage && <Spinner size={60} />}
          <div ref={inViewRef}></div>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center text-sm font-normal text-slate-600">
          {EMPTY_MESSAGE[filter]}
        </div>
      )}
    </div>
  );
});
