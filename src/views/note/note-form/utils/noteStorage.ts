import { CreateNoteBodyDto, UpdateNoteBodyDto } from "@/types/types";

const NOTE_DRAFT_CREATE_KEY = "note-draft-create";
const NOTE_DRAFT_UPDATE_KEY = "note-draft-update";

export interface NoteStorage<T extends CreateNoteBodyDto | UpdateNoteBodyDto> {
  set: (id: number, data: T) => void;
  get: (id: number) => T | null;
  clear: (id: number) => void;
}

export const CREATE_NOTE_STORAGE: NoteStorage<CreateNoteBodyDto> = {
  set: (todoId, data) => {
    localStorage.setItem(
      NOTE_DRAFT_CREATE_KEY,
      JSON.stringify({ [todoId]: { ...data, todoId } }),
    );
  },
  get: (todoId) => {
    const data = localStorage.getItem(NOTE_DRAFT_CREATE_KEY);

    return data ? JSON.parse(data)[todoId] : null;
  },
  clear: (todoId) => {
    const data = localStorage.getItem(NOTE_DRAFT_CREATE_KEY);

    // if (data) {
    //   const filteredData = JSON.parse(data).filter(
    //     (item: Omit<CreateNoteBodyDto, "todoId"> & { id: number }) =>
    //       item.id !== todoId,
    //   );

    //   localStorage.setItem(NOTE_DRAFT_CREATE_KEY, JSON.stringify(filteredData));
    // }
  },
};

export const UPDATE_NOTE_STORAGE: NoteStorage<UpdateNoteBodyDto> = {
  set: (noteId: number, data: UpdateNoteBodyDto) => {
    localStorage.setItem(
      NOTE_DRAFT_UPDATE_KEY,
      JSON.stringify({ [noteId]: { ...data, noteId } }),
    );
  },
  get: (noteId: number) => {
    const data = localStorage.getItem(NOTE_DRAFT_UPDATE_KEY);

    return data ? JSON.parse(data)[noteId] : null;
  },
  clear: (noteId: number) => {
    const data = localStorage.getItem(NOTE_DRAFT_UPDATE_KEY);

    // if (data) {
    //   const filteredData = JSON.parse(data).filter(
    //     (item: UpdateNoteBodyDto & { id: number }) => item.id !== noteId,
    //   );

    //   localStorage.setItem(NOTE_DRAFT_UPDATE_KEY, JSON.stringify(filteredData));
    // }
  },
};
