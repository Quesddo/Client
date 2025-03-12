import { useQuery } from "@tanstack/react-query";

import todoApi from "@/apis/todoApi";
import { useModalContext } from "@/contexts/InputModalContext";
import { useTodoForm } from "@/hooks/todo/form/useTodoForm";
import { useUpdateTodo } from "@/hooks/todo/useUpdateTodo";
import useToast from "@/hooks/useToast";
import { UpdateTodoBodyDto } from "@/types/types";

import { TodoForm } from "../todo-form/TodoForm";

export default function TodoUpdateForm({ todoId }: { todoId: number }) {
  const { addToast } = useToast();
  const { closeModal } = useModalContext();
  const updateTodoMutation = useUpdateTodo();
  const { data: todo } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => todoApi.fetchTodo(todoId),
    enabled: !!todoId,
  });

  const todoformProps = useTodoForm({
    isUpdate: true,
    todo,
  });

  const updateTodoSubmit = (data: UpdateTodoBodyDto) => {
    updateTodoMutation.mutate(
      { todoId, data },
      {
        onSuccess: () => {
          closeModal();
          addToast({
            content: "할 일이 수정되었습니다.",
          });
          todoformProps.formMethods.reset();
        },
      },
    );
  };

  return (
    <TodoForm
      isUpdate={true}
      handleTodoSubmit={updateTodoSubmit}
      {...todoformProps}
    />
  );
}
