import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import instance from "@/apis/apiClient";
import { TeamIdNotesGet200Response, teamIdNotesGetParams } from "@/types/types";

export const useInfiniteNotes = (goalId: number) => {
  const { ref: inViewRef, inView } = useInView();

  const query = useInfiniteQuery<TeamIdNotesGet200Response>({
    queryKey: ["notes", goalId],
    queryFn: async ({ pageParam }) => {
      const params: teamIdNotesGetParams = {
        goalId,
        cursor: pageParam as number,
        size: 5,
      };
      return (await instance.get("notes", { params })).data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
    enabled: !!goalId,
  });

  useEffect(() => {
    // 스크롤 감지 블럭이 화면에 들어오고 다음페이지가 존재하는 경우에 데이터 더 가져오기
    if (inView && query.hasNextPage) {
      query.fetchNextPage();
    }
  }, [inView, query.hasNextPage]);

  return { ...query, inViewRef };
};
