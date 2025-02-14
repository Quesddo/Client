import { useState } from "react";

import TodoList from "@/components/organisms/todo-list/TodoList";
import { useModalContext } from "@/contexts/InputModalContext";
import { useDeleteTodo } from "@/hooks/todo/useDeleteTodo";
import { useTodos } from "@/hooks/todo/useTodos";
import { useUpdateTodo } from "@/hooks/todo/useUpdateTodo";
import DeletePopup from "@/views/todo/popup/DeletePopup";
import TodoUpdateForm from "@/views/todo/todo-update-form/TodoUpdateForm";
import { cn } from "@/utils/cn";

export default function TodoPage() {
  const { data } = useTodos();
  const { isOpen } = useModalContext();
  const toggleTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const filterType = ["All", "Done", "To do"] as const;
  const [filter, setFilter] = useState<(typeof filterType)[number]>("All");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const filteredTodos = data?.todos.filter((todo) => {
    if (filter === "Done") return todo.done;
    if (filter === "To do") return !todo.done;
    return true;
  });
  const handleToggleTodo = (todoId: number, isDone: boolean) => {
    toggleTodoMutation.mutate({ todoId, data: { done: !isDone } });
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-slate-100 px-4 text-slate-800",
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

      <TodoList
        data={filteredTodos || []}
        handleToggleTodo={handleToggleTodo}
        setSelectedTodoId={setSelectedTodoId}
        onOpenDeletePopup={() => setIsPopupOpen(true)}
      />
      {isOpen && selectedTodoId && <TodoUpdateForm todoId={selectedTodoId} />}
      {isPopupOpen && selectedTodoId && (
        <DeletePopup
          onConfirm={() =>
            deleteTodoMutation.mutate(selectedTodoId, {
              onSuccess: () => {
                setIsPopupOpen(false);
              },
            })
          }
          onCancel={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
}
