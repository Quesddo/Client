import { useMutation, useQueryClient } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { TodoResponse } from "@/types/todo";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ todoId, done }: { todoId: number; done: boolean }) => {
      const { data } = await instance.patch(`/todos/${todoId}`, { done });
      return data;
    },
    onMutate: async ({ todoId, done }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<TodoResponse>(["todos"]);
      // 낙관적 업데이트
      if (previousTodos) {
        queryClient.setQueryData<TodoResponse>(["todos"], {
          ...previousTodos,
          todos: previousTodos.todos.map((todo) =>
            todo.id === todoId ? { ...todo, done } : todo,
          ),
        });
      }
      return { previousTodos };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error, variables, context) => {
      // 낙관적 업데이트를 롤백
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
      alert(`${error}`);
    },
  });
};
