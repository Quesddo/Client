import { useInfiniteQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import goalApi from "@/apis/goalApi";
import { todoApi } from "@/apis/todoApi";
import { TeamIdGoalsGet200Response, teamIdGoalsGetParams } from "@/types/types";

export const useInfiniteGoals = () => {
  return useInfiniteQuery<
    TeamIdGoalsGet200Response,
    Error,
    {
      goals: TeamIdGoalsGet200Response["goals"];
    }
  >({
    queryKey: ["goals"],
    queryFn: async ({ pageParam }) =>
      await goalApi.fetchGoals(pageParam as number | undefined),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (originData) => ({
      goals: originData.pages.flatMap((page) => [...page.goals]),
    }),
  });
};
