import { useMutation, useQueryClient } from "@tanstack/react-query";

import goalApi from "@/apis/goalApi";
import { TeamIdGoalsGet200Response } from "@/types/types";

export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addGoal"],
    mutationFn: goalApi.createGoal,
    onSuccess: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["goals"] });

      queryClient.setQueryData(
        ["goals"],
        (oldData: {
          pages: TeamIdGoalsGet200Response[];
          pageParams: number;
        }) => {
          if (!oldData) return oldData;

          return {
            pages: [
              {
                ...oldData.pages[0],
                goals: [data, ...oldData.pages[0].goals],
              },
              ...oldData.pages.slice(1),
            ],
            pageParams: oldData.pageParams,
          };
        },
      );
    },
  });
};
