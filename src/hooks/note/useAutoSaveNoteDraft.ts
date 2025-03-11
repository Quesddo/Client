import { useEffect, useRef } from "react";
import { type UseFormReturn } from "react-hook-form";

import { CreateNoteBodyDto, UpdateNoteBodyDto } from "@/types/types";

import useToast from "../useToast";
import { useNoteStorage } from "./useNoteStorage";

interface UseAutoSaveNoteDraftProps<
  TNoteBody extends CreateNoteBodyDto | UpdateNoteBodyDto,
> {
  id: number;
  methods: UseFormReturn<TNoteBody>;
  isEditMode: boolean;
}

const TOAST_INTERVAL_TIME = 1000 * 60 * 5;

export const useAutoSaveNoteDraft = <
  TNoteBody extends CreateNoteBodyDto | UpdateNoteBodyDto,
>({
  id,
  methods,
  isEditMode,
}: UseAutoSaveNoteDraftProps<TNoteBody>) => {
  const {
    formState: { isDirty },
  } = methods;
  const { addToast } = useToast();
  const { saveDraftNote } = useNoteStorage({ id, isEditMode });

  const toastIntervalRef = useRef<NodeJS.Timeout>(null);

  const saveDraftNoteAndShowToast = () => {
    saveDraftNote(methods.getValues());
    addToast({
      content: "임시 저장이 완료되었습니다",
    });
  };

  const removeInterval = () => {
    if (toastIntervalRef.current) {
      clearInterval(toastIntervalRef.current);
      toastIntervalRef.current = null;
    }
  };

  const addInterval = () => {
    removeInterval();

    toastIntervalRef.current = setInterval(() => {
      saveDraftNoteAndShowToast();
    }, TOAST_INTERVAL_TIME);
  };

  const handleClickSaveDraft = () => {
    saveDraftNoteAndShowToast();
    addInterval();
  };

  // 첫 데이터 입력 시 임시저장 토스트 시작
  useEffect(() => {
    if (isDirty) {
      addInterval();
    }

    return () => {
      removeInterval();
    };
  }, [isDirty]);

  return {
    handleClickSaveDraft,
  };
};
