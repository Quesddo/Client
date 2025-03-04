import { useEffect, useRef } from "react";
import { type Path, type PathValue, type UseFormReturn } from "react-hook-form";

import { CreateNoteBodyDto, UpdateNoteBodyDto } from "@/types/types";
import {
  CREATE_NOTE_STORAGE,
  NoteStorage,
  UPDATE_NOTE_STORAGE,
} from "@/views/note/note-form/utils/noteStorage";

import useToast from "../useToast";

interface UseNoteDraftProps<
  TNoteBody extends CreateNoteBodyDto | UpdateNoteBodyDto,
> {
  id: number;
  methods: UseFormReturn<TNoteBody>;
  isEditMode: boolean;
}

const TOAST_INTERVAL_TIME = 1000 * 60 * 5;

export default function useNoteDraft<
  TNoteBody extends CreateNoteBodyDto | UpdateNoteBodyDto,
>({ id, isEditMode, methods }: UseNoteDraftProps<TNoteBody>) {
  const { watch } = methods;
  const { addToast } = useToast();
  const toastIntervalRef = useRef<NodeJS.Timeout>(null);

  const saveDraft = () => {
    const values = methods.getValues();
    const noteStorage =
      "todoId" in values ? CREATE_NOTE_STORAGE : UPDATE_NOTE_STORAGE;

    if ("todoId" in values) {
      noteStorage.set(id, values);
    } else {
      (noteStorage as NoteStorage<UpdateNoteBodyDto>).set(id, values);
    }
  };

  const handleSaveAndToast = () => {
    saveDraft();
    addToast({
      content: "임시 저장이 완료되었습니다",
    });
  };

  const addInterval = () => {
    toastIntervalRef.current = setInterval(() => {
      handleSaveAndToast();
    }, TOAST_INTERVAL_TIME);
  };

  const removeInterval = () => {
    if (toastIntervalRef.current) {
      clearInterval(toastIntervalRef.current);
    }
  };

  const checkFormkValueChange = () => {
    if (!toastIntervalRef.current) {
      addInterval();
    }
  };

  const handleClickSaveDraft = () => {
    removeInterval();
    handleSaveAndToast();
    addInterval();
  };

  const handleLoadNoteDraft = () => {
    const noteStorage = isEditMode ? UPDATE_NOTE_STORAGE : CREATE_NOTE_STORAGE;

    const data = noteStorage.get(id) as TNoteBody | null;

    if (data) {
      Object.keys(data).forEach((key) => {
        methods.setValue(
          key as Path<TNoteBody>,
          data[key as keyof TNoteBody] as PathValue<TNoteBody, Path<TNoteBody>>,
        );
      });
    }
  };

  const isNoteDraftSaved = () => {
    const noteStorage = isEditMode ? UPDATE_NOTE_STORAGE : CREATE_NOTE_STORAGE;

    return !!noteStorage.get(id);
  };

  // form 내용 변화 감지
  useEffect(() => {
    const { unsubscribe } = watch(checkFormkValueChange);

    return () => unsubscribe();
  }, [watch]);

  return { handleClickSaveDraft, handleLoadNoteDraft, isNoteDraftSaved };
}
