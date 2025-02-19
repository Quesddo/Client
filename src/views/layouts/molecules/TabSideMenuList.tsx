import { useInfiniteQuery } from "@tanstack/react-query";
import { forwardRef, memo, Ref, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

import instance from "@/apis/apiClient";
import { TeamIdGoalsGet200Response, teamIdGoalsGetParams } from "@/types/types";
import { cn } from "@/utils/cn";

import TabSideMenuItem from "../atoms/TabSideMenuItem";

export default memo(
  forwardRef(function TabSideMenuList(_, ref: Ref<HTMLDivElement | null>) {
    const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isError,
      error,
    } = useInfiniteQuery<
      TeamIdGoalsGet200Response,
      Error,
      TeamIdGoalsGet200Response["goals"]
    >({
      queryKey: ["goals"],
      queryFn: async ({ pageParam }) => {
        const params: teamIdGoalsGetParams = {
          sortOrder: "newest",
          size: 10,
          cursor: pageParam as number,
        };

        const { data } = await instance.get("/goals", { params });

        return data;
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      select: (data) => data.pages.map((page) => [...page.goals]).flat(),
    });

    const ulRef = useRef<HTMLUListElement>(null);

    const { ref: inViewRef, inView } = useInView({
      root: (ref as React.RefObject<HTMLDivElement>)?.current,
      threshold: 1,
    });

    useEffect(() => {
      const divEl = (ref as React.RefObject<HTMLDivElement>)?.current;
      const ulEl = ulRef?.current;

      if (!divEl || !ulEl) {
        return;
      }

      if (
        inView &&
        hasNextPage &&
        !isFetchingNextPage &&
        ulEl.scrollHeight <= divEl.clientHeight
      ) {
        fetchNextPage();
      }
    }, [inView, hasNextPage, isFetchingNextPage]);

    useEffect(() => {
      const divEl = (ref as React.RefObject<HTMLDivElement>)?.current;
      const ulEl = ulRef?.current;

      if (!divEl || !ulEl) {
        return;
      }

      if (inView && hasNextPage && ulEl.scrollHeight > divEl.clientHeight) {
        fetchNextPage();
      }
    }, [inView, hasNextPage]);

    if (isError) {
      return <p>에러 발생: {(error as Error).message}</p>;
    }

    return (
      <div
        className={cn(
          "relative flex min-h-0 flex-1 flex-col overflow-hidden",
          hasNextPage &&
            "after:absolute after:inset-x-0 after:bottom-0 after:h-1/3 after:max-h-[80px] after:bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.6)_57%,rgba(255,255,255,0.8)_100%)]",
        )}
        ref={ref}
      >
        <ul className="min-h-0 flex-1 overflow-auto" ref={ulRef}>
          {data?.map((goal) => (
            <TabSideMenuItem key={goal.id} content={goal.title} />
          ))}
          {data?.length && <li ref={inViewRef}></li>}
        </ul>
      </div>
    );
  }),
);
