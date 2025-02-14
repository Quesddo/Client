import { useCallback } from "react";

import { useTodos } from "@/hooks/todo/useTodos";
import { useUpdateTodo } from "@/hooks/todo/useUpdateTodo";
import { cn } from "@/utils/cn";
import Todos from "@/views/todo/todoPage/Todos";

const HEADER_HEIGHT = 48;

export default function TodoPage() {
  const { data, isLoading, error } = useTodos();
  const toggleTodoMutation = useUpdateTodo();

  const handleToggleTodo = useCallback(
    (todoId: number, isDone: boolean) => {
      toggleTodoMutation.mutate({ todoId, done: !isDone });
    },
    [toggleTodoMutation],
  );

  if (isLoading) return <p>로딩중...</p>;
  if (error) return <p>에러 발생: {(error as Error).message}</p>;

  const mobileHeight = `min-h-[calc(100vh-${HEADER_HEIGHT}px)]`;

  return (
    <div
      className={cn(
        "flex flex-col bg-slate-100 px-4 text-slate-800",
        mobileHeight,
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

      {data && <Todos todos={data.todos} onToggleTodo={handleToggleTodo} />}
    </div>
  );
}
