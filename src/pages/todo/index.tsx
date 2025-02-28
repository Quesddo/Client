import { useCallback, useMemo, useState } from "react";

import PlusIcon from "@/components/atoms/plus-icon/PlusIcon";
import { useModalContext } from "@/contexts/InputModalContext";
import { useDeleteTodo } from "@/hooks/todo/useDeleteTodo";
import { useTodos } from "@/hooks/todo/useTodos";
import { useUpdateTodo } from "@/hooks/todo/useUpdateTodo";
import { cn } from "@/utils/cn";
import DeletePopup from "@/views/todo/popup/DeletePopup";
import TodoCreateForm from "@/views/todo/todo-create-form/TodoCreateForm";
import TodoUpdateForm from "@/views/todo/todo-update-form/TodoUpdateForm";
import Todos from "@/views/todo/todoPage/Todos";

export const FILTER_TYPES = ["All", "Done", "To do"] as const;

export default function TodoPage() {
  const { data } = useTodos();
  const toggleTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const { isOpen, openModal } = useModalContext();

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [filter, setFilter] = useState<(typeof FILTER_TYPES)[number]>("All");

  console.log("(TodoPage) data 확인:", data);
  const filteredTodos = useMemo(() => {
    return (
      (data?.todos ?? []).filter((todo) => {
        if (filter === "Done") return todo.done;
        if (filter === "To do") return !todo.done;
        return true;
      }) || []
    );
  }, [data?.todos, filter]);

  const handleToggleTodo = useCallback(
    (todoId: number, isDone: boolean) => {
      toggleTodoMutation.mutate({ todoId, data: { done: !isDone } });
    },
    [toggleTodoMutation],
  );

  const handleOpenCreateModal = () => {
    setSelectedTodoId(null);
    openModal();
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-slate-100 px-4 text-slate-800",
        "h-[calc(100vh-48px)]",
        "smd:pl-90 sm:h-screen sm:pl-21",
      )}
    >
      <div className="flex items-center justify-between sm:max-w-[636px] md:max-w-[792px]">
        <h1 className="py-[18px] text-base font-semibold sm:text-lg">
          모든 할일 ({data?.totalCount ?? 0})
        </h1>

        <button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-1 text-sm font-semibold text-blue-500"
        >
          <PlusIcon width={16} height={16} />
          할일 추가
        </button>
      </div>

      <Todos
        todos={filteredTodos}
        filter={filter}
        setFilter={setFilter}
        handleToggleTodo={handleToggleTodo}
        setSelectedTodoId={setSelectedTodoId}
        setIsPopupOpen={() => setIsPopupOpen(true)}
      />

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
