import { useState } from "react";

import TodoList from "@/components/organisms/todo-list/TodoList";
import { useTodos } from "@/hooks/todo/useTodos";
import { useUpdateTodo } from "@/hooks/todo/useUpdateTodo";
import { cn } from "@/utils/cn";

export default function TodoPage() {
  const { data, isLoading, error } = useTodos();
  const toggleTodoMutation = useUpdateTodo();

  const FILTER_TYPES = ["All", "Done", "To do"] as const;
  const [filter, setFilter] = useState<(typeof FILTER_TYPES)[number]>("All");

  const filteredTodos = data?.todos.filter((todo) => {
    if (filter === "Done") return todo.done;
    if (filter === "To do") return !todo.done;
    return true;
  });
  const handleToggleTodo = (todoId: number, isDone: boolean) => {
    toggleTodoMutation.mutate({ todoId, done: !isDone });
  };

  if (isLoading) return <p>로딩중...</p>;
  if (error) return <p>에러 발생: {(error as Error).message}</p>;

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 px-6 pb-6 text-slate-800">
      <div className="flex items-center justify-between">
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

      <div className="flex flex-grow flex-col rounded-xl bg-white p-4 sm:p-6 md:max-w-[792px]">
        <div>
          {FILTER_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={cn(
                "mr-2 mb-4 rounded-full border border-slate-200 px-3 py-1 text-sm font-medium hover:shadow-sm",
                filter === type ? "border-blue-500 bg-blue-500 text-white" : "",
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
            {filter === "Done" && "해야할 일이 아직 없어요"}
            {filter === "To do" && "다 한 일이 아직 없어요"}
          </div>
        )}
      </div>
    </div>
  );
}
