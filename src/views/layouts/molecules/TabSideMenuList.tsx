import { useInfiniteQuery } from "@tanstack/react-query";
import { memo, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

import instance from "@/apis/apiClient";
import { TeamIdGoalsGet200Response, teamIdGoalsGetParams } from "@/types/types";

import TabSideMenuItem from "../atoms/TabSideMenuItem";

export default memo(function TabSideMenuList() {
  const { data, fetchNextPage, hasNextPage, isError, error } =
    useInfiniteQuery<TeamIdGoalsGet200Response>({
      queryKey: ["goals"],
      queryFn: async ({ pageParam }) => {
        const params: teamIdGoalsGetParams = {
          sortOrder: "newest",
          size: 20,
          cursor: pageParam as number,
        };

        const { data } = await instance.get("/goals", { params });

        return data;
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const goals = data?.pages.map((page) => [...page.goals]).flat();

  const ref = useRef<HTMLUListElement>(null);

  const { ref: inViewRef, inView } = useInView({
    root: ref.current,
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  if (isError) {
    <p>에러 발생: {(error as Error).message}</p>;
  }

  return (
    <ul className="flex min-h-0 flex-1 flex-col overflow-auto" ref={ref}>
      {goals?.map((item) => (
        <TabSideMenuItem key={item.id} content={item.title} />
      ))}
      {goals?.length && <li ref={inViewRef}>hi</li>}
    </ul>
  );
});
