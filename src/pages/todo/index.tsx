import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

import PlusIcon from "@/components/atoms/plus-icon/PlusIcon";
import Spinner from "@/components/atoms/spinner/Spinner";
import { useModalContext } from "@/contexts/InputModalContext";
import { useDeleteTodo } from "@/hooks/todo/useDeleteTodo";
import { useInfiniteTodo } from "@/hooks/todo/useInfiniteTodo";
import { useUpdateTodo } from "@/hooks/todo/useUpdateTodo";
import { cn } from "@/utils/cn";
import DeletePopup from "@/views/todo/popup/DeletePopup";
import TodoCreateForm from "@/views/todo/todo-create-form/TodoCreateForm";
import TodoUpdateForm from "@/views/todo/todo-update-form/TodoUpdateForm";
import Todos from "@/views/todo/todoPage/Todos";

export const FILTER_TYPES = ["All", "Done", "To do"] as const;

export default function TodoPage() {
  const { ref: inViewRef, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteTodo();
  const toggleTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const { isOpen, openModal } = useModalContext();

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [filter, setFilter] = useState<(typeof FILTER_TYPES)[number]>("All");

  const allTodos = useMemo(() => {
    return data?.pages.flatMap((page) => page.todos ?? []) ?? [];
  }, [data?.pages]);

  const filteredTodos = useMemo(() => {
    return allTodos.filter((todo) => {
      if (filter === "Done") return todo.done;
      if (filter === "To do") return !todo.done;
      return true;
    });
  }, [allTodos, filter]);

  const totalCount = data?.pages[0]?.totalCount ?? 0;

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

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div
      className={cn(
        "flex min-h-[calc(100vh-48px)] flex-col bg-slate-100 px-4 text-slate-800",
        "smd:pl-90 sm:min-h-screen sm:pl-21",
      )}
    >
      <div className="flex items-center justify-between sm:max-w-[636px] md:max-w-[792px]">
        <h1 className="py-[18px] text-base font-semibold sm:text-lg">
          모든 할일 ({totalCount})
        </h1>

        <button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-1 text-sm font-semibold text-blue-500"
        >
          <PlusIcon width={16} height={16} />
          할일 추가
        </button>
      </div>

      <Suspense fallback={<Spinner size={60} />}>
        <Todos
          inViewRef={inViewRef}
          todos={filteredTodos}
          filter={filter}
          setFilter={setFilter}
          handleToggleTodo={handleToggleTodo}
          setSelectedTodoId={setSelectedTodoId}
          setIsPopupOpen={() => setIsPopupOpen(true)}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Suspense>

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
