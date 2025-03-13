import { createQueryKeys } from "@lukemorales/query-key-factory";

import { UseInfiniteGoalsSource } from "@/hooks/goal/useInfiniteGoals";

export const goalQueryKeys = createQueryKeys("goal", {
  /**
   * 목표 무한스크롤 쿼리키
   * @param source API를 호출하는 곳
   * @returns queryKey: ["goal", "infinite", {"source": source}]
   */
  infinite: (source: UseInfiniteGoalsSource) => ({
    queryKey: [{ source: source }],
  }),

  /**
   * 단일 목표 쿼리키
   * @param goalId 조회할 목표의 ID
   * @returns queryKey: ["goal", "detail", {"goalId": goalId}]
   */
  detail: (goalId) => ({
    queryKey: [{ goalId: goalId }],
  }),
});
