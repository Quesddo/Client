import { useQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { TodoResponse } from "@/types/todo";

export const useTodos = (goalId?: number) => {
  return useQuery<TodoResponse>({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await instance.get(`/todos?goalID=${goalId ?? ""}`);
      return data;
    },
  });
};
