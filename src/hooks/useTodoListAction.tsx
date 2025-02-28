import { useState } from "react";

import { useModalContext } from "@/contexts/InputModalContext";
import { useDeleteTodo } from "@/hooks/todo/useDeleteTodo";
import { useUpdateTodo } from "@/hooks/todo/useUpdateTodo";

interface TodoListActions {
  selectedTodoId: number | null;
  isPopupOpen: boolean;
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  setSelectedTodoId: (id: number | null) => void;
  onOpenDeletePopup: (todoId: number) => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}

export function useTodoListAction(): TodoListActions {
  const { closeModal } = useModalContext();
  const toggleTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleToggleTodo = (todoId: number, isDone: boolean) => {
    toggleTodoMutation.mutate({ todoId, data: { done: !isDone } });
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
        },
      });
    }
  };

  const onCancelDelete = () => {
    setIsPopupOpen(false);
    setSelectedTodoId(null);
    closeModal();
  };

  return {
    selectedTodoId,
    isPopupOpen,
    handleToggleTodo,
    setSelectedTodoId,
    onOpenDeletePopup,
    onConfirmDelete,
    onCancelDelete,
  };
}
