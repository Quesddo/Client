import { TodoResponse } from "@/types/todo";

import { ActionIcon } from "../../atoms/action-icon/ActionIcon";
import { TodoCheckbox } from "../../atoms/todo-checkbox/TodoCheckbox";
import { TodoTitle } from "../../atoms/todo-title/TodoTitle";

interface TodoItemProps {
  todo: TodoResponse["todos"][number];
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  onOpenNoteDetail: (noteId: TodoResponse["todos"][number]["noteId"]) => void;
  onOpenTodoModal: () => void;
}

export function TodoItem({
  todo,
  handleToggleTodo,
  onOpenNoteDetail,
  onOpenTodoModal,
}: TodoItemProps) {
  return (
    <li className="group mb-2 flex h-6 w-full last:mb-0">
      <TodoCheckbox
        done={todo.done}
        onToggle={() => handleToggleTodo(todo.id, todo.done)}
      />
      <div className="flex w-full min-w-0 items-center justify-between">
        <TodoTitle title={todo.title} done={todo.done} />
        <ActionIcon
          todo={todo}
          onOpenNoteDetail={onOpenNoteDetail}
          onOpenTodoModal={onOpenTodoModal}
        />
      </div>
    </li>
  );
}
