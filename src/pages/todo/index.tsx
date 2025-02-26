import { useState } from "react";

import PlusIcon from "@/components/atoms/plus-icon/PlusIcon";
import TodoList from "@/components/organisms/todo-list/TodoList";
import { useModalContext } from "@/contexts/InputModalContext";
import { useDeleteTodo } from "@/hooks/todo/useDeleteTodo";
import { useTodos } from "@/hooks/todo/useTodos";
import { useUpdateTodo } from "@/hooks/todo/useUpdateTodo";
import { cn } from "@/utils/cn";
import DeletePopup from "@/views/todo/popup/DeletePopup";
import TodoCreateForm from "@/views/todo/todo-create-form/TodoCreateForm";
import TodoUpdateForm from "@/views/todo/todo-update-form/TodoUpdateForm";

export default function TodoPage() {
  const { data } = useTodos();
  const { isOpen, openModal } = useModalContext();
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

  const handleOpenCreateModal = () => {
    setSelectedTodoId(null);
    openModal();
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-slate-100 px-4 text-slate-800",
        "h-[calc(100vh-64px)] pb-4",
        "sm:h-[calc(100vh-16px)] sm:px-6 md:px-20",
      )}
    >
      <div className="flex items-center justify-between sm:max-w-[636px] md:max-w-[792px]">
        <h1 className="py-[18px] text-base font-semibold sm:text-lg">
          모든 할일 ({data?.totalCount})
        </h1>

        <button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-1 text-sm font-semibold text-blue-500"
        >
          <PlusIcon width={16} height={16} />
          할일 추가
        </button>
      </div>

      <div className="h-full rounded-xl bg-white p-4 sm:max-w-[604px] md:max-w-[760px]">
        {filterType.map((type) => (
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
        <TodoList
          data={filteredTodos || []}
          handleToggleTodo={handleToggleTodo}
          setSelectedTodoId={setSelectedTodoId}
          onOpenDeletePopup={() => setIsPopupOpen(true)}
        />
      </div>

      {isOpen && !selectedTodoId && <TodoCreateForm />}
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
