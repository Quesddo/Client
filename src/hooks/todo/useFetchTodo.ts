import { useSuspenseQuery } from "@tanstack/react-query";

import todoApi from "@/apis/todoApi";

export const useFetchTodo = (todoId: number) => {
  return useSuspenseQuery({
    queryKey: ["todo", todoId],
    queryFn: () => todoApi.fetchTodo(todoId),
  });
};
