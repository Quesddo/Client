import { useCallback } from "react";

import PlusIcon from "@/components/atoms/plus-icon/PlusIcon";
import BoundaryWrapper from "@/components/organisms/boundary-wrapper/BoundaryWrapper";
import { useModalContext } from "@/contexts/InputModalContext";
import { useTodoListAction } from "@/hooks/todo/useTodoListAction";
import { cn } from "@/utils/cn/cn";
import DeletePopup from "@/views/todo/popup/DeletePopup";
import TodoCreateForm from "@/views/todo/todo-create-form/TodoCreateForm";
import TodoUpdateForm from "@/views/todo/todo-update-form/TodoUpdateForm";
import Todos from "@/views/todo/todoPage/Todos";

import QuesddoHead from "../../components/atoms/quesddo-head/QuesddoHead";

export default function TodoPage() {
  const { modalType, openModal } = useModalContext();
  const {
    selectedTodoId,
    isPopupOpen,
    handleToggleTodo,
    setSelectedTodoId,
    onOpenDeletePopup,
    onConfirmDelete,
    onCancelDelete,
  } = useTodoListAction();

  const handleOpenCreateModal = useCallback(() => {
    setSelectedTodoId(null);
    openModal("createTodo");
  }, [setSelectedTodoId, openModal]);

  return (
    <>
      <QuesddoHead title="모든 할 일" />

      <div
        className={cn(
          "flex min-h-[calc(100vh-48px)] flex-col bg-slate-100 px-4 text-slate-800",
          "smd:pl-90 sm:min-h-screen sm:pl-21",
        )}
      >
        <div className="flex items-center justify-between sm:max-w-[636px] md:max-w-[792px]">
          <h1 className="py-[18px] text-base font-semibold sm:text-lg">
            모든 할 일
          </h1>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-1 text-sm font-semibold text-blue-500"
          >
            <PlusIcon width={16} height={16} />
            할일추가
          </button>
        </div>

        <BoundaryWrapper>
          <Todos
            handleToggleTodo={handleToggleTodo}
            setSelectedTodoId={setSelectedTodoId}
            onOpenDeletePopup={onOpenDeletePopup}
          />
        </BoundaryWrapper>

        {modalType === "createTodo" && <TodoCreateForm />}
        {modalType === "updateTodo" && selectedTodoId && (
          <TodoUpdateForm todoId={selectedTodoId} />
        )}
        {isPopupOpen && selectedTodoId && (
          <DeletePopup onConfirm={onConfirmDelete} onCancel={onCancelDelete} />
        )}
      </div>
    </>
  );
}
