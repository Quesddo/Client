import { CreateNoteBodyDto, UpdateNoteBodyDto } from "@/types/types";

const NOTE_DRAFT_CREATE_KEY = "note-draft-create";
const NOTE_DRAFT_UPDATE_KEY = "note-draft-update";

interface NoteStorageDataType {
  [key: number]: UpdateNoteBodyDto | CreateNoteBodyDto;
}

export interface NoteStorage<T extends CreateNoteBodyDto | UpdateNoteBodyDto> {
  set: (id: number, data: T) => void;
  get: (id: number) => CreateNoteBodyDto | null;
  remove: (id: number) => void;
}

export const CREATE_NOTE_STORAGE: NoteStorage<CreateNoteBodyDto> = {
  set: (todoId, data) => {
    const storageData = localStorage.getItem(NOTE_DRAFT_CREATE_KEY);
    const storedData = storageData ? JSON.parse(storageData) : {};

    localStorage.setItem(
      NOTE_DRAFT_CREATE_KEY,
      JSON.stringify({ ...storedData, [todoId]: { ...data, todoId } }),
    );
  },
  get: (todoId) => {
    const data = localStorage.getItem(NOTE_DRAFT_CREATE_KEY);

    return data ? JSON.parse(data)[todoId] : null;
  },
  remove: (todoId) => {
    const data = localStorage.getItem(NOTE_DRAFT_CREATE_KEY);

    if (data) {
      const parsedData = JSON.parse(data) as NoteStorageDataType;
      delete parsedData[todoId];

      localStorage.setItem(NOTE_DRAFT_CREATE_KEY, JSON.stringify(parsedData));
    }
  },
};

export const UPDATE_NOTE_STORAGE: NoteStorage<UpdateNoteBodyDto> = {
  set: (noteId: number, data: UpdateNoteBodyDto) => {
    const storageData = localStorage.getItem(NOTE_DRAFT_UPDATE_KEY);
    const storedData = storageData ? JSON.parse(storageData) : {};

    localStorage.setItem(
      NOTE_DRAFT_UPDATE_KEY,
      JSON.stringify({ ...storedData, [noteId]: { ...data, noteId } }),
    );
  },
  get: (noteId: number) => {
    const data = localStorage.getItem(NOTE_DRAFT_UPDATE_KEY);

    return data ? JSON.parse(data)[noteId] : null;
  },
  remove: (noteId: number) => {
    const data = localStorage.getItem(NOTE_DRAFT_UPDATE_KEY);

    if (data) {
      const parsedData = JSON.parse(data) as NoteStorageDataType;
      delete parsedData[noteId];

      localStorage.setItem(NOTE_DRAFT_UPDATE_KEY, JSON.stringify(parsedData));
    }
  },
};
