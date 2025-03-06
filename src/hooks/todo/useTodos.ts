import { useSuspenseQuery } from "@tanstack/react-query";

import { todoApi } from "@/apis/todoApi";
import { FilterType, TodoResponse } from "@/types/todo";

export const useTodos = (
  goalId?: number,
  size?: number,
  filter?: FilterType, // 모든 할 일(todo, done)을 조회하려면 filter를 지정하지 마세요.
) => {
  return useSuspenseQuery<TodoResponse>({
    queryKey: ["todos", goalId, filter],
    queryFn: () => todoApi.fetchTodos(goalId, size, filter),
  });
};
