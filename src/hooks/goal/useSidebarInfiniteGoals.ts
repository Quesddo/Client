import { Ref, RefObject, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useInfiniteGoals } from "./useInfiniteGoals";

export default function useSidebarInfiniteGoals<
  T extends HTMLElement | null,
  U extends HTMLElement | null,
>(parentRef: Ref<T>, childRef: Ref<U>) {
  const query = useInfiniteGoals({ size: 20, source: "sidebar" });

  const { fetchNextPage, hasNextPage, isFetchingNextPage } = query;

  const { ref: inViewRef, inView } = useInView({
    root: (parentRef as RefObject<T>)?.current,
    threshold: 0,
  });

  // 스크롤 감지 블럭이 항상 true인 경우(자식 요소의 높이 <= 부모 요소의 높이), 추가 데이터 가져오기
  useEffect(() => {
    const parentEl = (parentRef as RefObject<T>)?.current;
    const childEl = (childRef as RefObject<U>)?.current;

    if (!parentEl || !childEl) {
      return;
    }

    if (
      inView &&
      hasNextPage &&
      !isFetchingNextPage &&
      childEl.scrollHeight <= parentEl.clientHeight
    ) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  // 스크롤 감지 블럭이 동작하는 경우(자식 요소의 높이 > 부모 요소의 높이), 무한 스크롤 처리
  useEffect(() => {
    const parentEl = (parentRef as RefObject<T>)?.current;
    const childEl = (childRef as RefObject<U>)?.current;

    if (!parentEl || !childEl) {
      return;
    }

    if (inView && hasNextPage && childEl.scrollHeight > parentEl.clientHeight) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);
  return { query, inViewRef };
}
