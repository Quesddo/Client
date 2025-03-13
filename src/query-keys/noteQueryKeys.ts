import { createQueryKeys } from "@lukemorales/query-key-factory";

export const noteQueryKeys = createQueryKeys("note", {
  /**
   * 노트 무한스크롤 쿼리키
   * @param goalId 노트들이 속해있는 목표의 ID
   * @returns queryKey: ["note", "infinite", {"goalId": goalId}]
   */
  infinite: (goalId: number) => ({
    queryKey: [{ goalId: goalId }],
  }),

  /**
   * 단일 노트 쿼리키
   * @param noteId 조회할 노트의 ID
   * @returns queryKey: ["note", "detail", {"noteId": noteId}]
   */
  detail: (noteId: number) => ({
    queryKey: [{ noteId: noteId }],
  }),
});
