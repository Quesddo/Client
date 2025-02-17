import { useMutation, useQueryClient } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { CreateGoalBodyDto, TeamIdGoalsGet200Response } from "@/types/types";

interface UseCreateGoalProps {
  onSuccess?: () => void;
  onError?: () => void;
}

const getLastGoalId = (goalList: TeamIdGoalsGet200Response["goals"]) => {
  return goalList.length ? goalList[goalList.length - 1].id : -1;
};

export const useCreateGoal = (options?: UseCreateGoalProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addGoal"],
    mutationFn: async (content: CreateGoalBodyDto["title"]) =>
      await instance.post("/goals", { title: content }),
    onMutate: async (newGoal: string) => {
      await queryClient.cancelQueries({ queryKey: ["goals"] });
      const previousTodos = queryClient.getQueryData(["goals"]);

      if (previousTodos) {
        const setNewGoalData = (old: TeamIdGoalsGet200Response) => ({
          ...old,
          goals: [
            ...old.goals,
            { id: `temp_${getLastGoalId(old.goals) + 1}`, title: newGoal },
          ],
        });

        queryClient.setQueryData(["goals"], setNewGoalData);
      }

      return { previousTodos };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });

      options?.onSuccess?.();
    },
    onError: (error, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["goals"], context?.previousTodos);
      }
      alert(error);

      options?.onError?.();
    },
  });
};
