import { useMutation, useQueryClient } from "@tanstack/react-query";

import todoApi from "@/apis/todoApi";
import { UpdateTodoBodyDto } from "@/types/types";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTodo: UpdateTodoBodyDto) => {
      return todoApi.createTodo(newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["todos", "infinite"] });
    },
  });
};
