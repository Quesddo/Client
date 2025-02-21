import { useState } from "react";

import TodoList from "@/components/organisms/todo-list/TodoList";
import { useModalContext } from "@/contexts/InputModalContext";
import { useTodos } from "@/hooks/todo/useTodos";
import { useUpdateTodo } from "@/hooks/todo/useUpdateTodo";
import TodoUpdateForm from "@/views/todo/todo-update-form/TodoUpdateForm";

export default function TodoPage() {
  const { data } = useTodos();
  const toggleTodoMutation = useUpdateTodo();
  const { isOpen } = useModalContext();

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const filterType = ["All", "Done", "To do"] as const;
  const [filter, setFilter] = useState<(typeof filterType)[number]>("All");
  const [_isModalOpen, setIsModalOpen] = useState(false);

  const filteredTodos = data?.todos.filter((todo) => {
    if (filter === "Done") return todo.done;
    if (filter === "To do") return !todo.done;
    return true;
  });
  const handleToggleTodo = (todoId: number, isDone: boolean) => {
    toggleTodoMutation.mutate({ todoId, data: { done: !isDone } });
  };

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

      <TodoList
        data={filteredTodos || []}
        handleToggleTodo={handleToggleTodo}
        setSelectedTodoId={setSelectedTodoId}
      />
      {isOpen && selectedTodoId && <TodoUpdateForm todoId={selectedTodoId} />}
    </div>
  );
}
