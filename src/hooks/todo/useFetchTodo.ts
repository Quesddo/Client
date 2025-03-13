import { useSuspenseQuery } from "@tanstack/react-query";

import todoApi from "@/apis/todoApi";
import { queryKeys } from "@/query-keys";

export const useFetchTodo = (todoId: number) => {
  return useSuspenseQuery({
    queryKey: queryKeys.todo.editNote(todoId).queryKey,
    queryFn: () => todoApi.fetchTodo(todoId),
  });
};
