import { ForwardedRef, forwardRef, memo, useRef } from "react";

import useInfiniteGoals from "@/hooks/goal/useIniniteGoals";
import { cn } from "@/utils/cn";

import TabSideMenuItem from "./TabSideMenuItem";

export default memo(
  forwardRef(function TabSideMenuList(_, ref: ForwardedRef<HTMLUListElement>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const {
      query: { data, isError, error, hasNextPage },
      inViewRef,
    } = useInfiniteGoals(containerRef, ref);

    if (isError) {
      return <p>에러 발생: {(error as Error).message}</p>;
    }

    return (
      <div
        className={cn(
          "relative flex min-h-0 flex-1 flex-col overflow-hidden",
          hasNextPage &&
            "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-1/3 after:max-h-[80px] after:bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.6)_57%,rgba(255,255,255,0.8)_100%)]",
        )}
        ref={containerRef}
      >
        <ul className="min-h-0 flex-1 overflow-auto" ref={ref}>
          {data?.map((goal) => (
            <TabSideMenuItem
              key={goal.id}
              content={goal.title}
              goalId={goal.id}
            />
          ))}
          {data?.length && <li ref={inViewRef}></li>}
        </ul>
      </div>
    );
  }),
);
