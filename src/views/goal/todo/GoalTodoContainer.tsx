import { useState } from "react";

import { useModalContext } from "@/contexts/InputModalContext";
import { useDeleteTodo } from "@/hooks/todo/useDeleteTodo";
import { useUpdateTodo } from "@/hooks/todo/useUpdateTodo";
import DeletePopup from "@/views/todo/popup/DeletePopup";
import TodoCreateForm from "@/views/todo/todo-create-form/TodoCreateForm";
import TodoUpdateForm from "@/views/todo/todo-update-form/TodoUpdateForm";

import GoalDoneList from "./GoalDoneList";
import GoalTodoList from "./GoalTodoList";
import Section from "../component/Section";

export default function GoalTodoContainer() {
  /* todolist */
  const { modalType, openModal } = useModalContext();
  const toggleTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleToggleTodo = (todoId: number, isDone: boolean) => {
    toggleTodoMutation.mutate({ todoId, data: { done: !isDone } });
  };

  const handleClickOpenCreateModal = () => {
    setSelectedTodoId(null);
    openModal("createTodo");
  };

  const onOpenDeletePopup = () => {
    setIsPopupOpen(true);
  };

  return (
    <Section className="flex flex-col gap-[16px] p-[0px] md:flex-row md:justify-between md:gap-[24px]">
      {/* todo list */}
      <GoalTodoList
        handleClick={handleClickOpenCreateModal}
        handleToggleTodo={handleToggleTodo}
        setSelectedTodoId={setSelectedTodoId}
        onOpenDeletePopup={onOpenDeletePopup}
      />
      {/* done list */}
      <GoalDoneList
        handleToggleTodo={handleToggleTodo}
        setSelectedTodoId={setSelectedTodoId}
        onOpenDeletePopup={onOpenDeletePopup}
      />

      {modalType === "createTodo" && <TodoCreateForm />}
      {modalType === "updateTodo" && selectedTodoId && (
        <TodoUpdateForm todoId={selectedTodoId} />
      )}
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
