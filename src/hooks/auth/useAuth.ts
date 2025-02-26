import { useQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { UserServiceResponseDto } from "@/types/types";

const fetchUser = async (): Promise<UserServiceResponseDto> => {
  const { data } = await instance.get("/user");
  return data;
};

export const useAuth = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 60,
  });

  return {
    isAuthenticated: !!user?.id,
    isLoading,
  };
};
