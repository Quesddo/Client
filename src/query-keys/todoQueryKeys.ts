import { createQueryKeys } from "@lukemorales/query-key-factory";

import { UseTodosParams } from "@/hooks/todo/useTodos";

export const todoQueryKeys = createQueryKeys("todo", {
  /**
   * 할 일 리스트 쿼리키
   * @param goalId 할 일들이 속해있는 목표의 ID
   * @param filter 완료 여부 필터링
   * @returns queryKey: ["todo", "list", {"goalId": goalId}, {"filter": filter}]
   */
  list: ({ goalId, filter }: Omit<UseTodosParams, "size">) => ({
    queryKey: [{ goalId: goalId }, { filter: filter }],
  }),

  /**
   * 할 일 무한스크롤 쿼리키
   * @param goalId 할 일들이 속해있는 목표의 ID
   * @param filter 완료 여부 필터링
   * @returns queryKey: ["todo", "infinite", {"goalId": goalId}, {"filter": filter}]
   */
  infinite: ({ goalId, filter }: Omit<UseTodosParams, "size">) => ({
    queryKey: [{ goalId: goalId }, { filter: filter }],
  }),

  /**
   * 노트 작성/수정 쿼리키
   * @param todoId 편집 중인 노트에 연결된 할 일의 ID
   * @returns queryKey: ["todo", "editNote", {"todoId": todoId}]
   */
  editNote: (todoId: number) => ({
    queryKey: [{ todoId: todoId }],
  }),

  /**
   * 할 일 진행률 쿼리키
   * @param goalId 진행률을 확인할 목표의 ID
   * @returns queryKey: ["todo", "progress", {"goalId": goalId}]
   */
  progress: (goalId?: number) => ({
    queryKey: [{ goalId: goalId }],
  }),
});
