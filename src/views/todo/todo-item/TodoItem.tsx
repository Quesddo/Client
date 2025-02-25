import { TodoResponse } from "@/types/todo";

import { TodoCheckbox } from "../todo-checkbox/TodoCheckbox";
import { ActionIcon } from "./action-icon/ActionIcon";
import { TodoTitle } from "./todo-title/TodoTitle";

interface TodoItemProps {
  todo: TodoResponse["todos"][number];
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  onOpenNoteDetail: (noteId: TodoResponse["todos"][number]["noteId"]) => void;
  onOpenTodoModal: () => void;
  onOpenDeletePopup: () => void;
}

export function TodoItem({
  todo,
  handleToggleTodo,
  onOpenNoteDetail,
  onOpenTodoModal,
  onOpenDeletePopup,
}: TodoItemProps) {
  return (
    <li className="group mb-2 flex h-6 w-full last:mb-0">
      <TodoCheckbox
        checked={todo.done}
        onToggle={() => handleToggleTodo(todo.id, todo.done)}
      />
      <div className="flex w-full min-w-0 items-center justify-between">
        <TodoTitle title={todo.title} done={todo.done} />
        <ActionIcon
          todo={todo}
          onOpenNoteDetail={onOpenNoteDetail}
          onOpenTodoModal={onOpenTodoModal}
          onOpenDeletePopup={onOpenDeletePopup}
        />
      </div>
    </li>
  );
}
