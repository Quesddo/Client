import { useInfiniteQuery } from "@tanstack/react-query";

import goalApi from "@/apis/goalApi";
import { queryKeys } from "@/query-keys";
import { TeamIdGoalsGet200Response } from "@/types/types";

export type UseInfiniteGoalsSource = "sidebar" | "dashboard" | "todoForm";

export interface UseInfiniteGoalsParams {
  source: UseInfiniteGoalsSource;
  size: number;
}

export const useInfiniteGoals = ({ source, size }: UseInfiniteGoalsParams) => {
  const goalInfiniteQueryKey = queryKeys.goal.infinite(source).queryKey;

  return useInfiniteQuery<
    TeamIdGoalsGet200Response,
    Error,
    {
      goals: TeamIdGoalsGet200Response["goals"];
    }
  >({
    queryKey: goalInfiniteQueryKey,
    queryFn: async ({ pageParam }) =>
      await goalApi.fetchGoals(pageParam as number | undefined, size),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (originData) => ({
      goals: originData.pages.flatMap((page) => [...page.goals]),
    }),
  });
};
