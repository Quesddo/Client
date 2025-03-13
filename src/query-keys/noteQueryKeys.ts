import { createQueryKeys } from "@lukemorales/query-key-factory";

export const noteQueryKeys = createQueryKeys("note", {
  /**
   * 노트 리스트
   * @param goalId 노트들이 속해있는 목표의 ID
   * @returns queryKey: ["note", "list", {"goalId": 전달된 goalId}]
   */
  list: (goalId: number) => ({
    queryKey: [{ goalId: goalId }],
  }),

  /**
   * 단일 노트
   * @param noteId 조회할 노트의 ID
   * @returns queryKey: ["note", "detail", {"noteId": 전달된 noteId}]
   */
  detail: (noteId: number) => ({
    queryKey: [{ noteId: noteId }],
  }),
});
