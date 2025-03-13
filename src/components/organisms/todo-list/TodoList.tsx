import { useState } from "react";

import { useTodoListActionContext } from "@/contexts/TodoListActionContext";
import { TodoResponse } from "@/types/todo";

import { TodoItem } from "../../../views/todo/todo-item/TodoItem";

interface TodoListProps {
  data: TodoResponse["todos"];
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  onOpenDeletePopup: (todoId: number) => void;
  isShowGoal?: boolean;
  isNew?: boolean;
}

export default function TodoList({
  data,
  handleToggleTodo,
  onOpenDeletePopup,
  isShowGoal,
  isNew,
}: TodoListProps) {
  const { onOpenUpdateModal } = useTodoListActionContext();
  const [isTouchedId, setIsTouchedId] = useState<number | null>(null);

  return (
    <ul className="text-sm font-normal text-slate-800">
      {data?.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggleTodo={handleToggleTodo}
          onOpenTodoModal={onOpenUpdateModal}
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
