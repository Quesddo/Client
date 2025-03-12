import { ForwardedRef, forwardRef, memo, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Spinner from "@/components/atoms/spinner/Spinner";
import ErrorFallback from "@/components/molecules/error-fallback/ErrorFallback";
import { useInfiniteGoals } from "@/hooks/goal/useInfiniteGoals";

import TabSideMenuItem from "./TabSideMenuItem";

const FETCH_GOALS_SIZE = 20;

export default memo(
  forwardRef(function TabSideMenuList(_, ref: ForwardedRef<HTMLUListElement>) {
    const query = useInfiniteGoals({
      size: FETCH_GOALS_SIZE,
      source: "sidebar",
    });

    const {
      data,
      isLoading,
      isError,
      error,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = query;

    const { ref: inViewRef, inView } = useInView({
      root: ref && "current" in ref ? ref.current : null,
    });

    const isFetchRequired = inView && hasNextPage && !isFetchingNextPage;

    useEffect(() => {
      if (isFetchRequired) {
        fetchNextPage();
      }
    }, [isFetchRequired]);

    return (
      <ul className="min-h-0 overflow-y-auto" ref={ref}>
        {isLoading && <Spinner size={60} />}
        {isError && <ErrorFallback error={error} />}
        {data && (
          <>
            {data?.goals.map((goal) => (
              <TabSideMenuItem
                key={goal.id}
                content={goal.title}
                goalId={goal.id}
              />
            ))}
            {data?.goals.length > 0 && <li ref={inViewRef}></li>}
          </>
        )}
      </ul>
    );
  }),
);
