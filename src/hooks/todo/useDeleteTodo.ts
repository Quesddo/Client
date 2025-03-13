import { useMutation, useQueryClient } from "@tanstack/react-query";

import todoApi from "@/apis/todoApi";
import { queryKeys } from "@/query-keys";
import { TodoResponse } from "@/types/todo";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  // 쿼리키 파싱
  const {
    _def: todoAllQueryKey,
    list: { _def: todoListQueryKey },
    infinite: { _def: todoInfiniteQueryKey },
  } = queryKeys.todo;

  return useMutation({
    mutationFn: async (todoId: number) => {
      return todoApi.deleteTodo(todoId);
    },
    onMutate: async (todoId: number) => {
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
          todos: previousTodos.todos.filter((todo) => todo.id !== todoId),
        });
      }
      if (previousInfiniteTodos) {
        queryClient.setQueryData(todoInfiniteQueryKey, {
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
