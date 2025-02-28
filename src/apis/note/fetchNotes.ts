import { teamIdNotesGetParams } from "@/types/types";

import instance from "../apiClient";

const PAGE_SIZE = 6;

export const fetchNotes = async (pageParam: number, goalId: number) => {
  const params: teamIdNotesGetParams = {
    goalId,
    cursor: pageParam,
    size: PAGE_SIZE,
  };
  return (await instance.get("notes", { params })).data;
};
