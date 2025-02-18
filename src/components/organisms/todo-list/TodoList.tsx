import { useState } from "react";

import { TodoResponse } from "@/types/todo";

import { TodoItem } from "../../molecules/todo-item/TodoItem";
import CreateModal from "../modal/CreateModal";

interface TodoListProps {
  data?: TodoResponse["todos"];
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
}

export default function TodoList({ data, handleToggleTodo }: TodoListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            console.log("할 일 수정 모달 열기");
            setIsModalOpen(true);
          }}
        />
      ))}
      {isModalOpen && (
        <CreateModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          모달내용
        </CreateModal>
      )}
    </ul>
  );
}
