import { useMutation, useQueryClient } from "@tanstack/react-query";

import todoApi from "@/apis/todoApi";
import { TodoResponse } from "@/types/todo";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoId: number) => {
      return todoApi.deleteTodo(todoId);
    },
    onMutate: async (todoId: number) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      await queryClient.cancelQueries({ queryKey: ["todos", "infinite"] });

      const previousTodos = queryClient.getQueryData<TodoResponse>(["todos"]);
      const previousInfiniteTodos = queryClient.getQueryData<{
        pages: { todos: TodoResponse["todos"]; totalCount: number }[];
        pageParams: number[];
      }>(["todos", "infinite"]);

      if (previousTodos) {
        queryClient.setQueryData<TodoResponse>(["todos"], {
          ...previousTodos,
          todos: previousTodos.todos.filter((todo) => todo.id !== todoId),
        });
      }
      if (previousInfiniteTodos) {
        queryClient.setQueryData(["todos", "infinite"], {
          ...previousInfiniteTodos,
          pages: previousInfiniteTodos.pages.map((page) => ({
            ...page,
            todos: page.todos.filter((todo) => todo.id !== todoId),
          })),
        });
      }
      return { previousTodos, previousInfiniteTodos };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["todos", "infinite"] });
    },
    onError: (_error, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
      if (context?.previousInfiniteTodos) {
        queryClient.setQueryData(
          ["todos", "infinite"],
          context.previousInfiniteTodos,
        );
      }
    },
  });
};
