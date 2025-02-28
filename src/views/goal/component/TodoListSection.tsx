import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import PlusIcon from "@/components/atoms/plus-icon/PlusIcon";
import TodoList from "@/components/organisms/todo-list/TodoList";
import { useModalContext } from "@/contexts/InputModalContext";
import { useDeleteTodo } from "@/hooks/todo/useDeleteTodo";
import { useTodos } from "@/hooks/todo/useTodos";
import { useUpdateTodo } from "@/hooks/todo/useUpdateTodo";
import DeletePopup from "@/views/todo/popup/DeletePopup";
import TodoCreateForm from "@/views/todo/todo-create-form/TodoCreateForm";
import TodoUpdateForm from "@/views/todo/todo-update-form/TodoUpdateForm";

import Section from "./Section";

interface TodoListContainerProps {
  goalId: number;
}

export default function TodoListSection({ goalId }: TodoListContainerProps) {
  const { data } = useTodos(goalId);
  const { isOpen, openModal } = useModalContext();
  const toggleTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleToggleTodo = (todoId: number, isDone: boolean) => {
    toggleTodoMutation.mutate({ todoId, data: { done: !isDone } });
  };

  const todos = data?.todos.filter((todo) => {
    return !todo.done;
  });

  const dones = data?.todos.filter((todo) => {
    return todo.done;
  });

  const handleOpenCreateModal = () => {
    setSelectedTodoId(null);
    openModal();
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["progress", goalId] });
  }, [data]);

  return (
    <>
      {/* todo list */}
      <Section className="flex-1 bg-white hover:shadow">
        <div className="mb-[16px] flex justify-between">
          <p className="text-lg font-bold">To do</p>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-1 text-sm font-semibold text-blue-500"
          >
            <PlusIcon width={16} height={16} />
            할일 추가
          </button>
        </div>
        <div className="min-h-[168px]">
          {todos?.length ? (
            <TodoList
              data={todos}
              handleToggleTodo={handleToggleTodo}
              setSelectedTodoId={setSelectedTodoId}
              onOpenDeletePopup={() => setIsPopupOpen(true)}
            />
          ) : (
            <div className="text-center text-sm leading-[168px] font-normal text-slate-500">
              해야할 일이 아직 없어요
            </div>
          )}
        </div>
      </Section>
      {/* done list */}
      <Section className="flex-1 bg-slate-200 hover:shadow">
        <div className="mb-[16px] flex justify-between">
          <p className="text-lg font-bold">done</p>
        </div>
        <div className="min-h-[168px]">
          {dones?.length ? (
            <TodoList
              data={dones}
              handleToggleTodo={handleToggleTodo}
              setSelectedTodoId={setSelectedTodoId}
              onOpenDeletePopup={() => setIsPopupOpen(true)}
            />
          ) : (
            <div className="text-center text-sm leading-[168px] font-normal text-slate-500">
              다 한 일이 아직 없어요
            </div>
          )}
        </div>
      </Section>
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
    </>
  );
}
