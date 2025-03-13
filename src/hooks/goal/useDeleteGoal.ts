import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import goalApi from "@/apis/goalApi";

import useToast from "../useToast";

export const useDeleteGoal = (goalId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: () => goalApi.deleteGoal(goalId),
    onSuccess: () => {
      addToast({
        variant: "error",
        content: "목표가 삭제되었습니다.",
      });
      queryClient.refetchQueries({ queryKey: ["goals"] });
      router.push("/dashboard");
    },
  });
};
