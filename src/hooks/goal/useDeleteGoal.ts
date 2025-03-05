import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import instance from "@/apis/apiClient";

export const useDeleteGoal = (goalId?: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await instance.delete(`/goals/${goalId}`);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      router.push("/dashboard");
    },
  });
};
