import PlusIcon from "@/components/atoms/plus-icon/PlusIcon";
import BoundaryWrapper from "@/components/organisms/boundary-wrapper/BoundaryWrapper";
import { useTodoListActionContext } from "@/contexts/TodoListActionContext";
import { cn } from "@/utils/cn/cn";
import Todos from "@/views/todo/todoPage/Todos";

import QuesddoHead from "../../components/atoms/quesddo-head/QuesddoHead";

export default function TodoPage() {
  const { handleToggleTodo, onOpenDeletePopup, onOpenCreateModal } =
    useTodoListActionContext();

  const handleCreatTodo = () => {
    onOpenCreateModal(undefined);
  };

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
            onClick={handleCreatTodo}
            className="flex items-center gap-1 text-sm font-semibold text-blue-500"
          >
            <PlusIcon width={16} height={16} />
            할일추가
          </button>
        </div>

        <div className="mb-4 flex-grow rounded-xl bg-white p-4 sm:mb-6 sm:max-w-[588px] sm:p-6 md:max-w-[744px]">
          <BoundaryWrapper>
            <Todos
              handleToggleTodo={handleToggleTodo}
              onOpenDeletePopup={onOpenDeletePopup}
            />
          </BoundaryWrapper>
        </div>
      </div>
    </>
  );
}
