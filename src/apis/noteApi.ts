import {
  CreateNoteBodyDto,
  TeamIdNotesGet200ResponseNotesInner,
  teamIdNotesGetParams,
  TeamIdNotesPost201Response,
  UpdateNoteBodyDto,
} from "@/types/types";

import instance from "./apiClient";

interface FetchNotesParams {
  pageParam?: number;
  goalId: number;
}

const noteApi = {
  createNote: async (
    body: CreateNoteBodyDto,
  ): Promise<TeamIdNotesPost201Response> => {
    return (await instance.post("/notes", body)).data;
  },
  updateNote: async (
    noteId: number,
    data: UpdateNoteBodyDto,
  ): Promise<TeamIdNotesPost201Response> => {
    return (await instance.patch(`/notes/${noteId}`, data)).data;
  },

  fetchNotes: async ({ pageParam, goalId }: FetchNotesParams) => {
    const PAGE_SIZE = 6;

    const params: teamIdNotesGetParams = {
      goalId,
      cursor: pageParam,
      size: PAGE_SIZE,
    };
    return (await instance.get("notes", { params })).data;
  },

  fetchNote: async (noteId: number): Promise<TeamIdNotesPost201Response> => {
    const { data } = await instance.get(`/notes/${noteId}`);
    return data;
  },

  deleteNote: async (noteId: number) => {
    return await instance.delete(`/notes/${noteId}`);
  },
};

export default noteApi;
