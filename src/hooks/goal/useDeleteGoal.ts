import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import instance from "@/apis/apiClient";
import { queryKeys } from "@/query-keys";
import routes from "@/router/routes";

import useToast from "../useToast";

export const useDeleteGoal = (goalId?: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const goalInfiniteQueryKey = queryKeys.goal.infinite._def;

  const { addToast } = useToast();
  return useMutation({
    mutationFn: async () => {
      const { data } = await instance.delete(`/goals/${goalId}`);
      return data;
    },
    onSuccess: () => {
      addToast({
        variant: "error",
        content: "목표가 삭제되었습니다.",
      });

      queryClient.invalidateQueries({ queryKey: goalInfiniteQueryKey });
      router.push(routes.dashboard());
    },
  });
};
