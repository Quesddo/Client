import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { todoApi } from "@/apis/todoApi";
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
    queryFn: () => todoApi.fetchTodo(todoId),
    enabled: !!todoId,
  });

  const todoformProps = useTodoForm(true);
  const { reset, setValue } = todoformProps.formMethods;
  const { setIsDone, setIsFileCheck, setIsLinkCheck, setSelectedInput } =
    todoformProps;

  const isInitialized = useRef(false);

  useEffect(() => {
    if (todo && !isInitialized.current) {
      reset(todo);
      setIsDone(todo.done || false);

      if (todo.fileUrl) setValue("fileUrl", todo.fileUrl);
      setIsFileCheck(!!todo.fileUrl);

      if (todo.linkUrl) setSelectedInput("link");
      setIsLinkCheck(!!todo.linkUrl);

      if (todo.goal?.id) setValue("goalId", todo.goal.id);

      isInitialized.current = true;
    }
  }, [todo]);

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
