import { CreateNoteBodyDto, UpdateNoteBodyDto } from "@/types/types";
import {
  CREATE_NOTE_STORAGE,
  NoteStorage,
  UPDATE_NOTE_STORAGE,
} from "@/views/note/note-form/utils/noteStorage";

interface UseNoteDraftProps {
  id: number;
  isEditMode: boolean;
}

export default function useNoteStorage({ id, isEditMode }: UseNoteDraftProps) {
  const noteStorage = isEditMode ? UPDATE_NOTE_STORAGE : CREATE_NOTE_STORAGE;

  const saveDraftNote = (values: CreateNoteBodyDto | UpdateNoteBodyDto) => {
    if ("todoId" in values) {
      noteStorage.set(id, values);
    } else {
      (noteStorage as NoteStorage<UpdateNoteBodyDto>).set(id, values);
    }
  };

  return {
    saveDraftNote,
    isNoteDraftSaved: () => !!noteStorage.get(id),
    getDraftNoteData: () =>
      noteStorage.get(id) as CreateNoteBodyDto | UpdateNoteBodyDto | null,
    removeNoteDraft: noteStorage.remove,
  };
}
