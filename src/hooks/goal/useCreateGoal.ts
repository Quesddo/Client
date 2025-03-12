import { useMutation, useQueryClient } from "@tanstack/react-query";

import goalApi from "@/apis/goalApi";

export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addGoal"],
    mutationFn: goalApi.createGoal,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};
