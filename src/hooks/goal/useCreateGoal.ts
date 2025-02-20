import { useMutation, useQueryClient } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { CreateGoalBodyDto, TeamIdGoalsGet200Response } from "@/types/types";

const getLastGoalId = (goalList: TeamIdGoalsGet200Response["goals"]) => {
  return goalList.length ? goalList[goalList.length - 1].id : -1;
};

interface useCreatieGoalProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateGoal = (config: useCreatieGoalProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addGoal"],
    mutationFn: async (content: CreateGoalBodyDto["title"]) =>
      await instance.post("/goals", { title: content }),
    onMutate: async (newGoal: string) => {
      await queryClient.cancelQueries({ queryKey: ["goals"] });

      const previousGoals = queryClient.setQueryData(
        ["goals"],
        (oldData: {
          pages: TeamIdGoalsGet200Response[];
          pageParams: number;
        }) => {
          if (!oldData) return oldData;

          const newGoalItem = {
            id: `temp_${getLastGoalId(oldData.pages[0].goals) + 1}`,
            title: newGoal,
          };

          return {
            pages: [
              {
                ...oldData.pages[0],
                goals: [newGoalItem, ...oldData.pages[0].goals],
              },
              ...oldData.pages.slice(1),
            ],
            pageParams: oldData.pageParams,
          };
        },
      );

      return { previousGoals };
    },
    onSuccess: () => {
      if (confirm("목표가 추가되었습니다.")) {
        config?.onSuccess?.();
      }
    },
    onError: (error, _, context) => {
      if (context?.previousGoals) {
        queryClient.setQueryData(["goals"], context?.previousGoals);
      }

      if (config?.onError) {
        config.onError(error);
      }
    },
  });
};
