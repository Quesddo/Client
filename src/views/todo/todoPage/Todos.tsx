import { useMemo, useState } from "react";

import TodoList from "@/components/organisms/TodoList";
import { TodoItem } from "@/types/todo";
import { cn } from "@/utils/cn";

const FILTER_TYPES = ["All", "Done", "To do"] as const;

interface TodosProps {
  todos: TodoItem[] | [];
  onToggleTodo: (todoId: number, isDone: boolean) => void;
}

export default function Todos({ todos, onToggleTodo }: TodosProps) {
  const [filter, setFilter] = useState<(typeof FILTER_TYPES)[number]>("All");

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      filter === "Done" ? todo.done : filter === "To do" ? !todo.done : true,
    );
  }, [todos, filter]);

  const emptyMessage: Record<(typeof FILTER_TYPES)[number], string> = {
    All: "등록한 일이 없어요",
    Done: "다 한 일이 아직 없어요",
    "To do": "해야할 일이 아직 없어요",
  };

  return (
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

      {filteredTodos.length > 0 ? (
        <TodoList data={filteredTodos} handleToggleTodo={onToggleTodo} />
      ) : (
        <div className="flex flex-1 items-center justify-center text-sm font-normal text-slate-600">
          {emptyMessage[filter]}
        </div>
      )}
    </div>
  );
}
