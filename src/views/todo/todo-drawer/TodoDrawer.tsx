import { useModalContext } from "@/contexts/InputModalContext";
import { useTodoListActionContext } from "@/contexts/TodoListActionContext";
import DeletePopup from "@/views/todo/popup/DeletePopup";
import TodoCreateForm from "@/views/todo/todo-create-form/TodoCreateForm";
import TodoUpdateForm from "@/views/todo/todo-update-form/TodoUpdateForm";

export default function TodoDrawer() {
  const { modalType } = useModalContext();
  const {
    selectedTodoId,
    isPopupOpen,
    createGoalId,
    onConfirmDelete,
    onCancelDelete,
  } = useTodoListActionContext();

  if (!modalType && !isPopupOpen) return null;

  return (
    <>
      {modalType === "createTodo" && <TodoCreateForm goalId={createGoalId} />}
      {modalType === "updateTodo" && selectedTodoId !== null && (
        <TodoUpdateForm todoId={selectedTodoId} />
      )}
      {isPopupOpen && selectedTodoId !== null && (
        <DeletePopup onConfirm={onConfirmDelete} onCancel={onCancelDelete} />
      )}
    </>
  );
}
