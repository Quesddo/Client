import TodoList from "@/components/organisms/todo-list/TodoList";
import { useTodos } from "@/hooks/todo/useTodos";
import { FilterType } from "@/types/todo";

import EmptyData from "./EmptyData";

// 목표별로 가져올 할 일 개수 설정
const FETCH_SIZE = 5;

interface TodoWrapperProps {
  goalId: number;
  doneStatus: FilterType;
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  setSelectedTodoId: (id: number | null) => void;
  onOpenDeletePopup: (todoId: number) => void;
}

/**
 * 완료 여부에 따라 할 일 리스트를 렌더링하는 컴포넌트
 */

export default function TodoWrapper({
  goalId,
  doneStatus,
  handleToggleTodo,
  setSelectedTodoId,
  onOpenDeletePopup,
}: TodoWrapperProps) {
  const {
    data: { todos },
  } = useTodos({ goalId, size: FETCH_SIZE, filter: doneStatus });

  const listLabel = doneStatus === "done" ? "Done" : "To do";

  return (
    <div className="grow basis-0">
      <div className="slate-800 mb-3 text-sm font-semibold">{listLabel}</div>

      {todos.length > 0 ? (
        <TodoList
          data={todos}
          handleToggleTodo={handleToggleTodo}
          setSelectedTodoId={setSelectedTodoId}
          onOpenDeletePopup={onOpenDeletePopup}
        />
      ) : (
        <EmptyData type={doneStatus} />
      )}
    </div>
  );
}
