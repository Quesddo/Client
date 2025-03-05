import { useInfiniteQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { TeamIdGoalsGet200Response, teamIdGoalsGetParams } from "@/types/types";

export const useFetchGoals = () => {
  return useInfiniteQuery<
    TeamIdGoalsGet200Response,
    Error,
    {
      goals: TeamIdGoalsGet200Response["goals"];
    }
  >({
    queryKey: ["goals"],
    queryFn: async ({ pageParam }) => {
      const params: teamIdGoalsGetParams = {
        sortOrder: "newest",
        size: 50,
        cursor: pageParam as number,
      };

      const { data } = await instance.get("/goals", { params });

      return data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (originData) => ({
      goals: originData.pages.flatMap((page) => [...page.goals]),
    }),
  });
};
