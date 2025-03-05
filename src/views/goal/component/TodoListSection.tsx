import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import PlusIcon from "@/components/atoms/plus-icon/PlusIcon";
import TodoList from "@/components/organisms/todo-list/TodoList";
import { useGoalDetailContext } from "@/contexts/GoalDetailContext";
import { useModalContext } from "@/contexts/InputModalContext";
import { useDeleteTodo } from "@/hooks/todo/useDeleteTodo";
import { useTodos } from "@/hooks/todo/useTodos";
import { useUpdateTodo } from "@/hooks/todo/useUpdateTodo";
import DeletePopup from "@/views/todo/popup/DeletePopup";
import TodoCreateForm from "@/views/todo/todo-create-form/TodoCreateForm";
import TodoUpdateForm from "@/views/todo/todo-update-form/TodoUpdateForm";

import Section from "./Section";

export default function TodoListSection() {
  const { updateProgress, goalId } = useGoalDetailContext();

  /* todolist */
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
  /* todolist */

  useEffect(() => {
    updateProgress(dones.length, data.totalCount);
  }, [data]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  }, [goalId]);

  return (
    <Section className="flex flex-col gap-[16px] p-[0px] md:flex-row md:justify-between md:gap-[24px]">
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
        <div className="h-[168px] overflow-x-hidden overflow-y-auto pr-4">
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
        <div className="h-[168px] overflow-x-hidden overflow-y-auto pr-4">
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
    </Section>
  );
}
