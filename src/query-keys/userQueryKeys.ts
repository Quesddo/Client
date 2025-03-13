import { createQueryKeys } from "@lukemorales/query-key-factory";

export const userQueryKeys = createQueryKeys("user", {
  /**
   * 유저 프로필 조회 쿼리키
   * @returns queryKey: ["user", "profile"]
   */
  profile: null,
});
