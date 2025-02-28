import { TeamIdNotesGet200ResponseNotesInner } from "@/types/types";

import instance from "../apiClient";

export const fetchNoteDetail = async (
  noteId: number,
): Promise<TeamIdNotesGet200ResponseNotesInner> =>
  (await instance.get(`/notes/${noteId}`)).data;
