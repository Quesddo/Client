import { useQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { queryKeys } from "@/query-keys";
import { TeamIdGoalsGet200ResponseGoalsInner } from "@/types/types";

export const useFetchGoal = (goalId?: number) => {
  const goalDetailQueryKey = queryKeys.goal.detail(goalId).queryKey;

  return useQuery<TeamIdGoalsGet200ResponseGoalsInner>({
    queryKey: goalDetailQueryKey,
    queryFn: async () => {
      const { data } = await instance.get(`/goals/${goalId}`);
      return data;
    },
    enabled: !!goalId,
  });
};
