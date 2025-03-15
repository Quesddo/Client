import { useQuery } from "@tanstack/react-query";

import { fetchCanEmbed } from "@/apis/canEmbedApi";
import { queryKeys } from "@/query-keys";

/**
 * 임베드 가능 여부 체크하는 훅
 */
export const useCanEmbed = (linkUrl?: string | null) => {
  const { data: canEmbed } = useQuery({
    queryKey: queryKeys.embed.canEmbed(linkUrl).queryKey,
    queryFn: () => fetchCanEmbed(linkUrl),
    enabled: !!linkUrl,
    staleTime: 1000 * 60 * 60, // 자주 바뀌지 않는 데이터라 1시간 staleTime 설정함
  });

  return { canEmbed };
};
