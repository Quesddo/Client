import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/query-keys";
import goalApi from "@/apis/goalApi";


export const useUpdateGoal = (goalId: number) => {
  const queryClient = useQueryClient();
  const goalInfiniteQueryKey = queryKeys.goal.infinite._def;
  const goalDetailQueryKey = queryKeys.goal.detail(goalId).queryKey;

  return useMutation({
    mutationFn: async (title: string) => goalApi.updateGoal({ goalId, title }),
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
