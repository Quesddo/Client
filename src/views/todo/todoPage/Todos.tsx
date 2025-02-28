import { Dispatch, memo, SetStateAction } from "react";

import TodoList from "@/components/organisms/todo-list/TodoList";
import { FILTER_TYPES } from "@/pages/todo";
import { TodoResponseDto } from "@/types/types";
import { cn } from "@/utils/cn";

const EMPTY_MESSAGE: Record<(typeof FILTER_TYPES)[number], string> = {
  All: "등록한 일이 없어요",
  Done: "다 한 일이 아직 없어요",
  "To do": "해야할 일이 아직 없어요",
};

interface TodosProps {
  todos: TodoResponseDto[];
  filter: (typeof FILTER_TYPES)[number];
  setFilter: Dispatch<SetStateAction<(typeof FILTER_TYPES)[number]>>;
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  setSelectedTodoId: (todoId: number | null) => void;
  setIsPopupOpen: () => void;
}

export default memo(function Todos({
  todos,
  filter,
  setFilter,
  handleToggleTodo,
  setSelectedTodoId,
  setIsPopupOpen,
}: TodosProps) {
  return (
    <div className="mb-4 flex h-full flex-grow flex-col rounded-xl bg-white p-4 sm:mb-6 sm:max-w-[588px] sm:p-6 md:max-w-[744px]">
      <div>
        {FILTER_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={cn(
              "mr-2 mb-4 rounded-full border border-slate-200 px-3 py-1 text-sm font-medium hover:shadow-sm",
              filter === type && "border-blue-500 bg-blue-500 text-white",
            )}
          >
            {type}
          </button>
        ))}
      </div>

      {todos.length > 0 ? (
        <TodoList
          data={todos}
          handleToggleTodo={handleToggleTodo}
          setSelectedTodoId={setSelectedTodoId}
          onOpenDeletePopup={setIsPopupOpen}
        />
      ) : (
        <div className="flex flex-1 items-center justify-center text-sm font-normal text-slate-600">
          {EMPTY_MESSAGE[filter]}
        </div>
      )}
    </div>
  );
});
