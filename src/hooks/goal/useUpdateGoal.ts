import { useMutation } from "@tanstack/react-query";

import instance from "@/apis/apiClient";

export const useUpdateGoal = (goalId: number) => {
  return useMutation({
    mutationFn: async (title: string) => {
      const { data } = await instance.patch(`/goals/${goalId}`, {
        title,
      });
      return data;
    },
  });
};
