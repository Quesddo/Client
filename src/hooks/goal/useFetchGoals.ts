import { useQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { TeamIdGoalsGet200Response } from "@/types/types";

export const useFetchGoals = () => {
  return useQuery<TeamIdGoalsGet200Response>({
    queryKey: ["goals"],
    queryFn: async () => {
      const { data } = await instance.get("/goals");

      return data;
    },
  });
};
