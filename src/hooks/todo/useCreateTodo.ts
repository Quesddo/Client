import { useMutation, useQueryClient } from "@tanstack/react-query";

import instance from "@/apis/apiClient";

interface NewTodo {
  title: string;
}

export const useFetchTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTodo: NewTodo) => {
      const { data } = await instance.post("/todos", newTodo);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
