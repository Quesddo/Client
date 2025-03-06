import TodoList from "@/components/organisms/todo-list/TodoList";
import { TodoResponseDto } from "@/types/types";

import EmptyData from "./EmptyData";

interface todoContentProps {
  data: TodoResponseDto[];
  isDone: boolean;
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  setSelectedTodoId: (id: number | null) => void;
  onOpenDeletePopup: (todoId: number) => void;
}

export default function TodoContent({
  data,
  isDone,
  handleToggleTodo,
  setSelectedTodoId,
  onOpenDeletePopup,
}: todoContentProps) {
  const filteredData = data.filter((it) => it.done === isDone);

  return (
    <div className="grow basis-0">
      <div className="slate-800 mb-3 text-sm font-semibold">
        {isDone ? "Done" : "To do"}
      </div>

      {data.length > 0 ? (
        <TodoList
          data={filteredData}
          handleToggleTodo={handleToggleTodo}
          setSelectedTodoId={setSelectedTodoId}
          onOpenDeletePopup={onOpenDeletePopup}
        />
      ) : (
        <EmptyData type={isDone ? "done" : "todo"} />
      )}
    </div>
  );
}
