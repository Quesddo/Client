import { useModalContext } from "@/contexts/InputModalContext";
import { useTodoListActionContext } from "@/contexts/TodoListActionContext";
import { useTodoForm } from "@/hooks/todo/form/useTodoForm";
import { useCreateTodo } from "@/hooks/todo/useCreateTodo";
import useToast from "@/hooks/useToast";
import { UpdateTodoBodyDto } from "@/types/types";

import { TodoForm } from "../todo-form/TodoForm";

export default function TodoCreateForm({ goalId }: { goalId?: number }) {
  const { addToast } = useToast();
  const { closeModal } = useModalContext();
  const todoformProps = useTodoForm({ goalId });
  const { reset } = todoformProps.formMethods;

  const createTodoMutation = useCreateTodo();
  const { setSelectedTodoId } = useTodoListActionContext();

  const createTodoSubmit = (data: UpdateTodoBodyDto) => {
    createTodoMutation.mutate(data, {
      onSuccess: () => {
        closeModal();
        addToast({
          content: "할 일이 등록되었습니다",
        });
        reset();
        setSelectedTodoId(null);
      },
    });
  };

  return <TodoForm handleTodoSubmit={createTodoSubmit} {...todoformProps} />;
}
