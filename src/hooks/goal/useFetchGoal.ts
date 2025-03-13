import { useQuery } from "@tanstack/react-query";

import goalApi from "@/apis/goalApi";
import { queryKeys } from "@/query-keys";
import { TeamIdGoalsGet200ResponseGoalsInner } from "@/types/types";

export const useFetchGoal = (goalId: number) => {
  const goalDetailQueryKey = queryKeys.goal.detail(goalId).queryKey;

  return useQuery<TeamIdGoalsGet200ResponseGoalsInner>({
    queryKey: goalDetailQueryKey,
    queryFn: async () => goalApi.fetchGoal(goalId),
  });
};
