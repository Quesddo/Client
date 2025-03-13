import { createQueryKeys } from "@lukemorales/query-key-factory";

import { UseInfiniteGoalsSource } from "@/hooks/goal/useInfiniteGoals";

export const goalQueryKeys = createQueryKeys("goal", {
  /**
   * 목표 리스트
   * @param source API를 호출하는 곳
   * @returns queryKey: ["goal", "list", {"source": 전달된 source}]
   */
  list: (source: UseInfiniteGoalsSource) => ({
    queryKey: [{ source: source }],
  }),

  /**
   * 단일 목표
   * @param goalId 조회할 목표의 ID
   * @returns queryKey: ["goal", "detail", {"goalId": 전달된 goalId}]
   */
  detail: (goalId) => ({
    queryKey: [{ goalId: goalId }],
  }),
});
