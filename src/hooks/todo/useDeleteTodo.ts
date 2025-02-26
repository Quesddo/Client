import { useMutation, useQueryClient } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { TodoResponse } from "@/types/todo";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoId: number) => {
      const { data } = await instance.delete(`/todos/${todoId}`);
      return data;
    },
    onMutate: async (todoId: number) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<TodoResponse>(["todos"]);

      if (previousTodos) {
        queryClient.setQueryData<TodoResponse>(["todos"], {
          ...previousTodos,
          todos: previousTodos.todos.filter((todo) => todo.id !== todoId),
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
      alert(`${error}`);
    },
  });
};
