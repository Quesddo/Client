import { useSuspenseQuery } from "@tanstack/react-query";

import goalApi from "@/apis/goalApi";
import { TeamIdGoalsGet200ResponseGoalsInner } from "@/types/types";

export const useFetchGoal = (goalId: number) => {
  return useSuspenseQuery<TeamIdGoalsGet200ResponseGoalsInner>({
    queryKey: ["goal", goalId],
    queryFn: async () => goalApi.fetchGoal(goalId),
  });
};
