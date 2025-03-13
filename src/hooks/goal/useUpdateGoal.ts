import { useMutation, useQueryClient } from "@tanstack/react-query";

import goalApi from "@/apis/goalApi";

export const useUpdateGoal = (goalId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => goalApi.updateGoal({ goalId, title }),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["goal", goalId] });
      queryClient.refetchQueries({ queryKey: ["goals"] });
    },
  });
};
