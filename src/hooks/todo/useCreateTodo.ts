import { useMutation, useQueryClient } from "@tanstack/react-query";

import todoApi from "@/apis/todoApi";
import { queryKeys } from "@/query-keys";
import { UpdateTodoBodyDto } from "@/types/types";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTodo: UpdateTodoBodyDto) => {
      return todoApi.createTodo(newTodo);
    },
    onSuccess: () => {
      const todoAllQueryKey = queryKeys.todo._def;

      queryClient.invalidateQueries({ queryKey: todoAllQueryKey });
    },
  });
};
