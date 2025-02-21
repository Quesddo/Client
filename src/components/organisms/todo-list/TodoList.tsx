import { Dispatch, SetStateAction } from "react";

import { useModalContext } from "@/contexts/InputModalContext";
import { TodoResponse } from "@/types/todo";

import { TodoItem } from "../../molecules/todo-item/TodoItem";

interface TodoListProps {
  data?: TodoResponse["todos"];
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function TodoList({
  data,
  handleToggleTodo,
  setIsModalOpen,
}: TodoListProps) {
  const { openModal } = useModalContext();

  return (
    <ul className="text-sm font-normal text-slate-800">
      {data?.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggleTodo={handleToggleTodo}
          onOpenNoteDetail={(noteId) => {
            console.log(`노트 상세 페이지 열기: ${noteId}`);
          }}
          onOpenTodoModal={() => {
            setIsModalOpen(true);
            openModal();
          }}
        />
      ))}
    </ul>
  );
}
