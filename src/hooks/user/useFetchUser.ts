import { useQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { UserServiceResponseDto } from "@/types/types";

export const useFetchUser = (throwOnError = false) => {
  const { data, isLoading } = useQuery<UserServiceResponseDto>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await instance.get("/user");
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
