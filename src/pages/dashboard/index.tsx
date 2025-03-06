import PageTitle from "@/components/atoms/page-title/PageTitle";
import { useModalContext } from "@/contexts/InputModalContext";
import { useTodoListAction } from "@/hooks/useTodoListAction";
import GoalBasedTodo from "@/views/dashboard/goal-based-todo/GoalBasedTodo";
import MyProgress from "@/views/dashboard/my-progress/MyProgress";
import RecentTodo from "@/views/dashboard/recent-todo/RecentTodo";
import DeletePopup from "@/views/todo/popup/DeletePopup";
import TodoCreateForm from "@/views/todo/todo-create-form/TodoCreateForm";
import TodoUpdateForm from "@/views/todo/todo-update-form/TodoUpdateForm";

export default function Dashboard() {
  const { isOpen } = useModalContext();
  const {
    selectedTodoId,
    isPopupOpen,
    handleToggleTodo,
    setSelectedTodoId,
    onOpenDeletePopup,
    onConfirmDelete,
    onCancelDelete,
  } = useTodoListAction();

  return (
    <main className="smd:pl-[357px] flex min-h-full flex-col bg-slate-100 px-4 text-slate-800 sm:pl-21">
      <PageTitle title="대시보드" className="sm:pt-6" isMobileFixed={true} />

      <div className="smd:max-w-[1200px] smd:gap-5 flex flex-grow flex-col gap-4 py-4 sm:pt-0">
        <div className="sm:flex sm:h-[250px] sm:justify-between sm:gap-5">
          <RecentTodo
            handleToggleTodo={handleToggleTodo}
            setSelectedTodoId={setSelectedTodoId}
            onOpenDeletePopup={onOpenDeletePopup}
          />
          <MyProgress />
        </div>
        <GoalBasedTodo
          handleToggleTodo={handleToggleTodo}
          setSelectedTodoId={setSelectedTodoId}
          onOpenDeletePopup={onOpenDeletePopup}
        />
      </div>

      {isOpen && !selectedTodoId && <TodoCreateForm />}
      {isOpen && selectedTodoId && <TodoUpdateForm todoId={selectedTodoId} />}
      {isPopupOpen && selectedTodoId && (
        <DeletePopup onConfirm={onConfirmDelete} onCancel={onCancelDelete} />
      )}
    </main>
  );
}
