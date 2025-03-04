import {
  CreateNoteBodyDto,
  TeamIdNotesPost201Response,
  UpdateNoteBodyDto,
} from "@/types/types";

import instance from "./apiClient";

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
  fetchNote: async (noteId: number): Promise<TeamIdNotesPost201Response> => {
    const { data } = await instance.get(`/notes/${noteId}`);

    return data;
  },
};

export default noteApi;
