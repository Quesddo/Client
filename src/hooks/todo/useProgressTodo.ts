import { useQuery } from "@tanstack/react-query";

import todoApi from "@/apis/todoApi";

export default function useProgressTodo(goalId?: number) {
  return useQuery({
    queryKey: ["todos", "progress", goalId],
    queryFn: () => todoApi.fetchProgress(goalId),
    staleTime: 0,
  });
}
