import { useState } from "react";

import TodoList from "@/components/organisms/todo-list/TodoList";
import { useTodos } from "@/hooks/todo/useTodos";
import { useUpdateTodo } from "@/hooks/todo/useUpdateTodo";

export default function Home() {
  const { data, isLoading, error } = useTodos();
  const toggleTodoMutation = useUpdateTodo();

  const filterType = ["All", "Done", "To do"] as const;
  const [filter, setFilter] = useState<(typeof filterType)[number]>("All");

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
    <div>
      <h1>모든 할일({data?.totalCount})</h1>
      <div>
        {filterType.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={filter === type ? "font-bold" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <TodoList data={filteredTodos} handleToggleTodo={handleToggleTodo} />
    </div>
  );
}
