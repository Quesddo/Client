import { useEffect, useState } from "react";

import { TodoResponse } from "@/types/todo";
import { cn } from "@/utils/cn";

import { TodoCheckbox } from "../todo-checkbox/TodoCheckbox";
import { ActionIcon } from "./action-icon/ActionIcon";
import { TodoTitle } from "./todo-title/TodoTitle";

interface TodoItemProps {
  todo: TodoResponse["todos"][number];
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  onOpenTodoModal: () => void;
  onOpenDeletePopup: (todoId: number) => void;
  isShowGoal?: boolean;
  isNew?: boolean;
  isTouched: boolean;
  setIsTouchedId: (id: number | null) => void;
}

export function TodoItem({
  todo,
  handleToggleTodo,
  onOpenTodoModal,
  onOpenDeletePopup,
  isShowGoal = false,
  isNew = false,
  isTouched,
  setIsTouchedId,
}: TodoItemProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(navigator.maxTouchPoints > 0);
  }, []);

  const handleCheckToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleToggleTodo(todo.id, todo.done);
  };

  const handleClickLi = () => {
    if (isMobile) setIsTouchedId(isTouched ? null : todo.id);
  };

  return (
    <li
      onClick={handleClickLi}
      className={cn(
        "group mb-2 w-full last:mb-0",
        isNew && "animate-slideUp will-change-[transform,opacity]",
      )}
    >
      <div className="flex h-6 items-center">
        <TodoCheckbox checked={todo.done} onToggle={handleCheckToggle} />

        <div className="flex w-full min-w-0 items-center justify-between">
          <TodoTitle title={todo.title} done={todo.done} />
          <ActionIcon
            todo={todo}
            onOpenTodoModal={onOpenTodoModal}
            onOpenDeletePopup={onOpenDeletePopup}
            isTouched={isTouched}
          />
        </div>
      </div>

      {todo.goal && isShowGoal && (
        <span className="ml-8 flex h-6 items-center gap-[6px] truncate text-sm font-light text-slate-500">
          <img src="/icons/goal.png" alt="goal" width={24} />
          {todo.goal?.title}
        </span>
      )}
    </li>
  );
}
