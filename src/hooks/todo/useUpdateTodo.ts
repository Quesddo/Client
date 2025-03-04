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
      await queryClient.cancelQueries({ queryKey: ["todos", "infinite"] });

      const previousTodos = queryClient.getQueryData<TodoResponse>(["todos"]);
      const previousInfiniteTodos = queryClient.getQueryData<{
        pages: { todos: TodoResponse["todos"]; totalCount: number }[];
        pageParams: number[];
      }>(["todos", "infinite"]);

      if (previousTodos) {
        queryClient.setQueryData<TodoResponse>(["todos"], {
          ...previousTodos,
          todos: previousTodos.todos.map((todo) =>
            todo.id === todoId ? { ...todo, ...data } : todo,
          ),
        });
      }
      if (previousInfiniteTodos) {
        queryClient.setQueryData(["todos", "infinite"], {
          ...previousInfiniteTodos,
          pages: previousInfiniteTodos.pages.map((page) => ({
            ...page,
            todos: page.todos.map((todo) =>
              todo.id === todoId ? { ...todo, ...data } : todo,
            ),
          })),
        });
      }
      return { previousTodos, previousInfiniteTodos };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["todos", "infinite"] });
    },
    onError: (error, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
      if (context?.previousInfiniteTodos) {
        queryClient.setQueryData(
          ["todos", "infinite"],
          context.previousInfiniteTodos,
        );
      }
      alert(`${error.message}`);
    },
  });
};
