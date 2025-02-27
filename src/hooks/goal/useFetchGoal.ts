import { useQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";

export const useFetchGoal = (goalId?: number) => {
  return useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const { data } = await instance.get(`/goals/${goalId}`);
      return data;
    },
  });
};
