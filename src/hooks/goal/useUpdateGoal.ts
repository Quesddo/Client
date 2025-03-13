import { useMutation, useQueryClient } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { queryKeys } from "@/query-keys";

export const useUpdateGoal = (goalId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      const { data } = await instance.patch(`/goals/${goalId}`, {
        title,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.goal.detail(goalId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.goal.list._def,
      });
    },
  });
};
