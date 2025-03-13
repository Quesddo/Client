import { useMutation, useQueryClient } from "@tanstack/react-query";

import todoApi from "@/apis/todoApi";
import { queryKeys } from "@/query-keys";
import { TodoResponse } from "@/types/todo";
import { UpdateTodoBodyDto } from "@/types/types";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  const {
    _def: todoAllQueryKey,
    list: { _def: todoListQueryKey },
    infinite: { _def: todoInfiniteQueryKey },
  } = queryKeys.todo;

  return useMutation({
    mutationFn: async ({
      todoId,
      data,
    }: {
      todoId: number;
      data: Partial<UpdateTodoBodyDto> & { done?: boolean };
    }) => {
      return todoApi.updateTodo(todoId, data);
    },

    onMutate: async ({ todoId, data }) => {
      await queryClient.cancelQueries({ queryKey: todoAllQueryKey });

      const previousTodos =
        queryClient.getQueryData<TodoResponse>(todoListQueryKey);
      const previousInfiniteTodos = queryClient.getQueryData<{
        pages: { todos: TodoResponse["todos"]; totalCount: number }[];
        pageParams: number[];
      }>(todoInfiniteQueryKey);

      if (previousTodos) {
        queryClient.setQueryData<TodoResponse>(todoListQueryKey, {
          ...previousTodos,
          todos: previousTodos.todos.map((todo) =>
            todo.id === todoId ? { ...todo, ...data } : todo,
          ),
        });
      }
      if (previousInfiniteTodos) {
        queryClient.setQueryData(todoInfiniteQueryKey, {
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
      queryClient.invalidateQueries({ queryKey: todoAllQueryKey });
    },
    onError: (_error, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(todoListQueryKey, context.previousTodos);
      }
      if (context?.previousInfiniteTodos) {
        queryClient.setQueryData(
          todoInfiniteQueryKey,
          context.previousInfiniteTodos,
        );
      }
    },
  });
};
