import { useSuspenseQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { TodoResponse } from "@/types/todo";

export const useTodos = (goalId?: number) => {
  return useSuspenseQuery<TodoResponse>({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await instance.get(`/todos?goalId=${goalId ?? ""}`);
      return data;
    },
  });
};
