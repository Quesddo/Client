import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import instance from "@/apis/apiClient";

export const useDeleteGoal = (goalId?: number) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const { data } = await instance.delete(`/goals/${goalId}`);

      return data;
    },
    onSuccess: () => {
      alert("목표가 삭제 되었습니다.");
      router.push("/dashboard");
    },
  });
};
