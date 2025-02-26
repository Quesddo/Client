import instance from "../apiClient";

export const deleteNote = async (noteId: number) =>
  await instance.delete(`/notes/${noteId}`);
