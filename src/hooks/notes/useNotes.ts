import { useQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import { TeamIdNotesGet200Response, teamIdNotesGetParams } from "@/types/types";

export const useNotes = (params?: teamIdNotesGetParams) => {
  return useQuery<TeamIdNotesGet200Response>({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data } = await instance.get("/notes", { params });
      return data;
    },
  });
};
