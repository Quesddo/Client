import { useMutation, useQueryClient } from "@tanstack/react-query";

import instance from "@/apis/apiClient";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ todoId, done }: { todoId: number; done: boolean }) => {
      const { data } = await instance.patch(`/todos/${todoId}`, { done });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
