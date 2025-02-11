import { TodoResponse } from "@/types/todo";

import { ActionIcon } from "../atoms/ActionIcon";
import { TodoCheckbox } from "../atoms/TodoCheckbox";
import { TodoTitle } from "../atoms/TodoTitle";

interface TodoItemProps {
  todo: TodoResponse["todos"][number];
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  onOpenNoteDetail: (noteId: TodoResponse["todos"][number]["noteId"]) => void;
  onOpenNoteModal: () => void;
}

export function TodoItem({
  todo,
  handleToggleTodo,
  onOpenNoteDetail,
  onOpenNoteModal,
}: TodoItemProps) {
  return (
    <li className="group flex">
      <TodoCheckbox
        done={todo.done}
        onToggle={() => handleToggleTodo(todo.id, todo.done)}
      />
      <TodoTitle title={todo.title} done={todo.done} />
      <ActionIcon
        todo={todo}
        onOpenNoteDetail={onOpenNoteDetail}
        onOpenNoteModal={onOpenNoteModal}
      />
    </li>
  );
}
