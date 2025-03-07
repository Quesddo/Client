import { useState } from "react";

import { useModalContext } from "@/contexts/InputModalContext";
import { TodoResponse } from "@/types/todo";

import { TodoItem } from "../../../views/todo/todo-item/TodoItem";

interface TodoListProps {
  data: TodoResponse["todos"];
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  setSelectedTodoId: (todoId: number | null) => void;
  onOpenDeletePopup: (todoId: number) => void;
  isShowGoal?: boolean;
  isNew?: boolean;
}

export default function TodoList({
  data,
  handleToggleTodo,
  setSelectedTodoId,
  onOpenDeletePopup,
  isShowGoal,
  isNew,
}: TodoListProps) {
  const { openModal } = useModalContext();
  const [isTouchedId, setIsTouchedId] = useState<number | null>(null);

  return (
    <ul className="text-sm font-normal text-slate-800">
      {data?.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggleTodo={handleToggleTodo}
          onOpenTodoModal={() => {
            setSelectedTodoId(todo.id);
            openModal("updateTodo");
          }}
          onOpenDeletePopup={onOpenDeletePopup}
          isShowGoal={isShowGoal}
          isNew={isNew}
          isTouched={isTouchedId === todo.id}
          setIsTouchedId={setIsTouchedId}
        />
      ))}
    </ul>
  );
}
