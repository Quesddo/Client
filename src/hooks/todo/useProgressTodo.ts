import { useQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";

async function fetchTodoProgress(goalId: number) {
  const res = await instance.get(`/todos/progress?goalId=${goalId}`);
  return res.data;
}

export default function useProgressTodo(goalId: number) {
  return useQuery({
    queryKey: ["todos", "progress", goalId],
    queryFn: () => fetchTodoProgress(goalId),
    staleTime: 0,
  });
}
