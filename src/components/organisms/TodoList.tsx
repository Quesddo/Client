import { TodoResponse } from "@/types/todo";

import { TodoItem } from "../molecules/TodoItem";

interface TodoListProps {
  data?: TodoResponse["todos"];
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
}

export default function TodoList({ data, handleToggleTodo }: TodoListProps) {
  return (
    <ul>
      {data?.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggleTodo={handleToggleTodo}
          onOpenNoteDetail={(noteId) =>
            console.log(`노트 상세 페이지 열기: ${noteId}`)
          }
          onOpenNoteModal={() => console.log("노트 작성 모달 열기")}
        />
      ))}
    </ul>
  );
}
