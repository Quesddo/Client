import { useMutation, useQueryClient } from "@tanstack/react-query";

import instance from "@/apis/apiClient";

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
      queryClient.invalidateQueries({ queryKey: ["goal", goalId] });
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};
