import { createQueryKeys } from "@lukemorales/query-key-factory";

export const embedQueryKeys = createQueryKeys("embed", {
  /**
   * 링크 임베드 가능 여부 쿼리키
   * @returns queryKey: ["embed", "canEmbed", {"linkUrl" : linkUrl}]
   */
  canEmbed: (linkUrl?: string | null) => ({
    queryKey: [{ linkUrl: linkUrl }],
  }),
});
