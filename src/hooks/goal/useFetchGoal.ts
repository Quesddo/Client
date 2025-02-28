import { useQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { TeamIdGoalsGet200ResponseGoalsInner } from "@/types/types";

export const useFetchGoal = (goalId?: number) => {
  return useQuery<TeamIdGoalsGet200ResponseGoalsInner>({
    queryKey: ["goal", goalId],
    queryFn: async () => {
      const { data } = await instance.get(`/goals/${goalId}`);
      return data;
    },
    enabled: !!goalId,
  });
};
