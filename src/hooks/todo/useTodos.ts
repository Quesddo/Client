import { useSuspenseQuery } from "@tanstack/react-query";

import { todoApi } from "@/apis/todoApi";
import { FilterType, TodoResponse } from "@/types/todo";

export const useTodos = (
  goalId?: number,
  size?: number,
  filter?: FilterType,
) => {
  return useSuspenseQuery<TodoResponse>({
    queryKey: ["todos", goalId, filter],
    queryFn: () => todoApi.fetchTodos(goalId, size, filter),
  });
};
