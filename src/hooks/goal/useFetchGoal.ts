import { useQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { queryKeys } from "@/query-keys";
import { TeamIdGoalsGet200ResponseGoalsInner } from "@/types/types";

export const useFetchGoal = (goalId?: number) => {
  return useQuery<TeamIdGoalsGet200ResponseGoalsInner>({
    queryKey: queryKeys.goal.detail(goalId).queryKey,
    queryFn: async () => {
      const { data } = await instance.get(`/goals/${goalId}`);
      return data;
    },
    enabled: !!goalId,
  });
};
