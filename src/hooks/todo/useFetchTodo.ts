import { useQuery } from "@tanstack/react-query";

import todoApi from "@/apis/todoApi";

export const useFetchTodo = (todoId: number) => {
  return useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => todoApi.fetchTodo(todoId),
  });
};
