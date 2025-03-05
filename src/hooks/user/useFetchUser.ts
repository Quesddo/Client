import { useSuspenseQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { UserServiceResponseDto } from "@/types/types";

export const useFetchUser = () => {
  return useSuspenseQuery<UserServiceResponseDto>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await instance.get("/user");

      return data;
    },
  });
};
