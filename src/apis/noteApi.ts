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
    return await instance.post("/notes", body);
  },
  updateNote: async ({
    noteId,
    data,
  }: {
    noteId: string;
    data: UpdateNoteBodyDto;
  }): Promise<TeamIdNotesPost201Response> => {
    return await instance.patch(`/notes/${noteId}`, data);
  },
  fetchNote: async (noteId: string): Promise<TeamIdNotesPost201Response> => {
    return await instance.get(`/notes/${noteId}`);
  },
};

export default noteApi;
