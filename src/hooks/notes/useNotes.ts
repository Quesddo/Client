import { useInfiniteQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { TeamIdNotesGet200Response, teamIdNotesGetParams } from "@/types/types";

export const useNotes = (goalId: number) => {
  return useInfiniteQuery<TeamIdNotesGet200Response>({
    queryKey: ["notes", goalId],
    queryFn: async ({ pageParam }) => {
      const params: teamIdNotesGetParams = {
        goalId,
        cursor: pageParam as number,
        size: 10,
      };
      return (
        await instance.get("notes", {
          params,
        })
      ).data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
    enabled: !!goalId,
  });
};
