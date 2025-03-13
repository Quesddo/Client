import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import { useModalContext } from "@/contexts/InputModalContext";
import { useDeleteTodo } from "@/hooks/todo/useDeleteTodo";
import { useUpdateTodo } from "@/hooks/todo/useUpdateTodo";
import useToast from "@/hooks/useToast";

interface TodoListActions {
  selectedTodoId: number | null;
  isPopupOpen: boolean;
  createGoalId: number | undefined;
  setCreateGoalId: (goalId: number) => void;
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  setSelectedTodoId: (id: number | null) => void;
  onOpenDeletePopup: (todoId: number) => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  onOpenUpdateModal: (todoId: number) => void;
  onOpenCreateModal: (goalId: number | undefined) => void;
}

const TodoListActionContext = createContext<TodoListActions | null>(null);

export const TodoListActionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { addToast } = useToast();
  const { openModal, closeModal } = useModalContext();
  const toggleTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [createGoalId, setCreateGoalId] = useState<number | undefined>(
    undefined,
  );

  const onOpenUpdateModal = useCallback(
    (todoId: number) => {
      setSelectedTodoId(todoId);
      openModal("updateTodo");
    },
    [setSelectedTodoId, openModal],
  );

  const onOpenCreateModal = useCallback(
    (goalId: number | undefined) => {
      setSelectedTodoId(null);
      setCreateGoalId(goalId);
      openModal("createTodo");
    },
    [setSelectedTodoId, setCreateGoalId, openModal],
  );

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
        createGoalId,
        setCreateGoalId,
        handleToggleTodo,
        setSelectedTodoId,
        onOpenDeletePopup,
        onConfirmDelete,
        onCancelDelete,
        onOpenUpdateModal,
        onOpenCreateModal,
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
