import { useMutation, useQueryClient } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { TodoResponse } from "@/types/todo";
import { UpdateTodoBodyDto } from "@/types/types";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      todoId,
      data,
    }: {
      todoId: number;
      data: Partial<UpdateTodoBodyDto> & { done?: boolean };
    }) => {
      const { data: response } = await instance.patch(`/todos/${todoId}`, data);
      return response;
    },
    onMutate: async ({ todoId, data }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<TodoResponse>(["todos"]);

      if (previousTodos) {
        queryClient.setQueryData<TodoResponse>(["todos"], {
          ...previousTodos,
          todos: previousTodos.todos.map((todo) =>
            todo.id === todoId ? { ...todo, ...data } : todo,
          ),
        });
      }
      return { previousTodos };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
      alert(`${error.message}`);
    },
  });
};
