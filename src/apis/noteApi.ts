import apiRoutes from "@/router/apiRoutes";
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
    return (await instance.post(apiRoutes.note.create(), body)).data;
  },
  updateNote: async (
    noteId: number,
    data: UpdateNoteBodyDto,
  ): Promise<TeamIdNotesPost201Response> => {
    return (await instance.patch(apiRoutes.note.update(noteId), data)).data;
  },

  fetchNotes: async ({ pageParam, goalId }: FetchNotesParams) => {
    const PAGE_SIZE = 6;

    const params: teamIdNotesGetParams = {
      goalId,
      cursor: pageParam,
      size: PAGE_SIZE,
    };
    return (await instance.get(apiRoutes.note.list(), { params })).data;
  },

  fetchNote: async (noteId: number): Promise<TeamIdNotesPost201Response> => {
    const { data } = await instance.get(apiRoutes.note.detail(noteId));
    return data;
  },

  deleteNote: async (noteId: number) => {
    return await instance.delete(apiRoutes.note.delete(noteId));
  },
};

export default noteApi;
