import { useQuery } from "@tanstack/react-query";

import todoApi from "@/apis/todoApi";
import { queryKeys } from "@/query-keys";

export default function useProgressTodo(goalId?: number) {
  const todoProgressQueryKey = queryKeys.todo.progress(goalId).queryKey;

  return useQuery({
    queryKey: todoProgressQueryKey,
    queryFn: () => todoApi.fetchProgress(goalId),
    staleTime: 0,
  });
}
