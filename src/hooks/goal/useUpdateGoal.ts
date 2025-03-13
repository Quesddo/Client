import { useMutation, useQueryClient } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { queryKeys } from "@/query-keys";

export const useUpdateGoal = (goalId: number) => {
  const queryClient = useQueryClient();
  const goalInfiniteQueryKey = queryKeys.goal.infinite._def;
  const goalDetailQueryKey = queryKeys.goal.detail(goalId).queryKey;

  return useMutation({
    mutationFn: async (title: string) => {
      const { data } = await instance.patch(`/goals/${goalId}`, {
        title,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: goalDetailQueryKey,
      });
      queryClient.invalidateQueries({
        queryKey: goalInfiniteQueryKey,
      });
    },
  });
};
