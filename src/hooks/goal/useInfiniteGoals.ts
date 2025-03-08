import { useInfiniteQuery } from "@tanstack/react-query";

import goalApi from "@/apis/goalApi";
import { TeamIdGoalsGet200Response } from "@/types/types";

interface UseInfiniteGoalsParams {
  source: "sidebar" | "dashboard" | "todoForm";
  size: number;
}

export const useInfiniteGoals = ({ source, size }: UseInfiniteGoalsParams) => {
  return useInfiniteQuery<
    TeamIdGoalsGet200Response,
    Error,
    {
      goals: TeamIdGoalsGet200Response["goals"];
    }
  >({
    queryKey: ["goals", source],
    queryFn: async ({ pageParam }) =>
      await goalApi.fetchGoals(pageParam as number | undefined, size),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (originData) => ({
      goals: originData.pages.flatMap((page) => [...page.goals]),
    }),
  });
};
