import { useCallback, useMemo, useState } from "react";

import TodoList from "@/components/organisms/todo-list/TodoList";
import { useTodos } from "@/hooks/todo/useTodos";
import { useUpdateTodo } from "@/hooks/todo/useUpdateTodo";
import { cn } from "@/utils/cn";

const HEADER_HEIGHT = 48;
const FILTER_TYPES = ["All", "Done", "To do"] as const;

export default function TodoPage() {
  const { data, isLoading, error } = useTodos();
  const toggleTodoMutation = useUpdateTodo();

  const [filter, setFilter] = useState<(typeof FILTER_TYPES)[number]>("All");

  const filteredTodos = useMemo(() => {
    if (!data) return [];
    return data.todos.filter((todo) =>
      filter === "Done" ? todo.done : filter === "To do" ? !todo.done : true,
    );
  }, [data, filter]);

  const handleToggleTodo = useCallback(
    (todoId: number, isDone: boolean) => {
      toggleTodoMutation.mutate({ todoId, done: !isDone });
    },
    [toggleTodoMutation],
  );

  if (isLoading) return <p>로딩중...</p>;
  if (error) return <p>에러 발생: {(error as Error).message}</p>;

  return (
    <div
      className={cn(
        "flex flex-col bg-slate-100 px-4 text-slate-800",
        `min-h-[calc(100vh-${HEADER_HEIGHT}px)]`,
        "sm:min-h-screen sm:px-6 md:px-20",
      )}
    >
      <div className="flex items-center justify-between md:max-w-[792px]">
        <h1 className="py-[18px] text-base font-semibold sm:text-lg">
          모든 할일 ({data?.totalCount})
        </h1>

        <button className="flex items-center gap-1 text-sm font-semibold text-blue-500">
          <img
            src="/small-blue-plus.png"
            alt="할일 추가"
            width={16}
            height={16}
          />
          할일 추가
        </button>
      </div>

      <div className="mb-4 flex h-full flex-grow flex-col rounded-xl bg-white p-4 sm:mb-6 sm:p-6 md:max-w-[744px]">
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
            </button>
          ))}
        </div>

        {filteredTodos?.length > 0 ? (
          <TodoList data={filteredTodos} handleToggleTodo={handleToggleTodo} />
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm font-normal text-slate-600">
            {filter === "All" && "등록한 일이 없어요"}
            {filter === "Done" && "다 한 일이 아직 없어요"}
            {filter === "To do" && "해야할 일이 아직 없어요"}
          </div>
        )}
      </div>
    </div>
  );
}
