import { useQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { queryKeys } from "@/query-keys";
import apiRoutes from "@/router/apiRoutes";
import { UserServiceResponseDto } from "@/types/types";

export const useFetchUser = (throwOnError = false) => {
  const { data, isLoading } = useQuery<UserServiceResponseDto>({
    queryKey: queryKeys.user.profile.queryKey,
    queryFn: async () => {
      const { data } = await instance.get(apiRoutes.user.info());
      return data;
    },
    retry: false,
    staleTime: 1000 * 60 * 60,
    throwOnError: throwOnError,
  });

  return {
    data,
    isLoading,
    isAuthenticated: !!data?.id,
  };
};
