import { teamIdNotesGetParams } from "@/types/types";

import instance from "../apiClient";

const PAGE_SIZE = 6;

interface fetchNotesParams {
  pageParam?: number;
  goalId: number;
}

export const fetchNotes = async ({ pageParam, goalId }: fetchNotesParams) => {
  const params: teamIdNotesGetParams = {
    goalId,
    cursor: pageParam,
    size: PAGE_SIZE,
  };
  return (await instance.get("notes", { params })).data;
};
