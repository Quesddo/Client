import { useSuspenseQuery } from "@tanstack/react-query";

import { todoApi } from "@/apis/todoApi";
import { FilterType, TodoResponse } from "@/types/todo";

export interface UseTodosParams {
  goalId?: number;
  size?: number;
  filter?: FilterType;
}

export const useTodos = ({
  goalId,
  size,
  filter, // 모든 할 일(todo, done)을 조회하려면 filter를 지정하지 마세요.
}: UseTodosParams) => {
  return useSuspenseQuery<TodoResponse>({
    queryKey: ["todos", goalId, filter],
    queryFn: () => todoApi.fetchTodos(goalId, size, filter),
  });
};
