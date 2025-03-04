import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import instance from "@/apis/apiClient";
import { useModalContext } from "@/contexts/InputModalContext";
import { useTodoForm } from "@/hooks/todo/form/useTodoForm";
import { useUpdateTodo } from "@/hooks/todo/useUpdateTodo";
import useToast from "@/hooks/useToast";
import { UpdateTodoBodyDto } from "@/types/types";

import { TodoForm } from "../TodoForm";

export default function TodoUpdateForm({ todoId }: { todoId: number }) {
  const { addToast } = useToast();
  const { closeModal } = useModalContext();
  const updateTodoMutation = useUpdateTodo();

  const { data: todo } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: async () => {
      const response = await instance.get(`/todos/${todoId}`);
      return response.data;
    },
    enabled: !!todoId,
  });

  const todoformProps = useTodoForm(true);
  const { reset, setValue } = todoformProps.formMethods;
  const { setIsDone, setIsFileCheck, setIsLinkCheck, setSelectedInput } =
    todoformProps;

  useEffect(() => {
    if (todo) {
      reset(todo);
      setIsDone(todo.done || false);

      if (todo.fileUrl) {
        setIsFileCheck(true);
        setValue("fileUrl", todo.fileUrl);
      } else {
        setIsFileCheck(false);
      }

      if (todo.linkUrl) {
        setIsLinkCheck(true);
        setSelectedInput("link");
      } else {
        setIsLinkCheck(false);
      }

      if (todo.goal?.id) {
        setValue("goalId", todo.goal.id);
      }
    }
  }, [
    todo,
    reset,
    setValue,
    setIsDone,
    setIsFileCheck,
    setIsLinkCheck,
    setSelectedInput,
  ]);

  const updateTodoSubmit = (data: UpdateTodoBodyDto) => {
    updateTodoMutation.mutate(
      { todoId, data },
      {
        onSuccess: () => {
          closeModal();
          addToast({
            content: "할 일이 수정되었습니다.",
          });
          reset();
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
