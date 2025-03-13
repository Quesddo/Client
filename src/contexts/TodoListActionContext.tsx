import React, { createContext, ReactNode, useContext, useState } from "react";

import { useModalContext } from "@/contexts/InputModalContext";
import { useDeleteTodo } from "@/hooks/todo/useDeleteTodo";
import { useUpdateTodo } from "@/hooks/todo/useUpdateTodo";
import useToast from "@/hooks/useToast";

interface TodoListActions {
  selectedTodoId: number | null;
  isPopupOpen: boolean;
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  setSelectedTodoId: (id: number | null) => void;
  onOpenDeletePopup: (todoId: number) => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}

const TodoListActionContext = createContext<TodoListActions | null>(null);

export const TodoListActionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { addToast } = useToast();
  const { closeModal } = useModalContext();
  const toggleTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleToggleTodo = (todoId: number, isDone: boolean) => {
    toggleTodoMutation.mutate(
      { todoId, data: { done: !isDone } },
      {
        onSuccess: () => {
          addToast({
            content: "할 일이 수정되었습니다.",
          });
        },
        onError: (error: Error) => {
          addToast({
            variant: "error",
            content: error.message,
          });
        },
      },
    );
  };

  const onOpenDeletePopup = (todoId: number) => {
    setSelectedTodoId(todoId);
    setIsPopupOpen(true);
    closeModal();
  };

  const onConfirmDelete = () => {
    if (selectedTodoId !== null) {
      deleteTodoMutation.mutate(selectedTodoId, {
        onSuccess: () => {
          setIsPopupOpen(false);
          setSelectedTodoId(null);
          closeModal();
          addToast({
            content: "할 일이 삭제되었습니다.",
          });
        },
        onError: (error: Error) => {
          addToast({
            variant: "error",
            content: error.message,
          });
        },
      });
    }
  };

  const onCancelDelete = () => {
    setIsPopupOpen(false);
    setSelectedTodoId(null);
    closeModal();
  };

  return (
    <TodoListActionContext.Provider
      value={{
        selectedTodoId,
        isPopupOpen,
        handleToggleTodo,
        setSelectedTodoId,
        onOpenDeletePopup,
        onConfirmDelete,
        onCancelDelete,
      }}
    >
      {children}
    </TodoListActionContext.Provider>
  );
};

export const useTodoListActionContext = () => {
  const context = useContext(TodoListActionContext);
  if (!context) {
    throw new Error(
      "useTodoListActionContext은 TodoListActionProvider 내부에서 사용해야 합니다.",
    );
  }
  return context;
};
