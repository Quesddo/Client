import { useEffect, useRef } from "react";
import { type UseFormReturn } from "react-hook-form";

import { isEmptyNote } from "@/views/note/note-form/utils/checkEmptyNote";

import useToast from "../useToast";
import { useNoteStorage } from "./useNoteStorage";

interface UseAutoSaveNoteDraftProps {
  id: number;
  methods: UseFormReturn;
  isEditMode: boolean;
}

const TOAST_INTERVAL_TIME = 1000 * 60 * 5;

export const useAutoSaveNoteDraft = ({
  id,
  methods,
  isEditMode,
}: UseAutoSaveNoteDraftProps) => {
  const {
    getValues,
    formState: { isDirty },
  } = methods;
  const { addToast } = useToast();
  const { saveDraftNote } = useNoteStorage({ id, isEditMode });

  const toastIntervalRef = useRef<NodeJS.Timeout>(null);

  const saveDraftNoteAndShowToast = () => {
    const title = getValues("title");
    const plainContent = getValues("plainContent");
    const linkUrl = getValues("linkUrl");

    if (isEmptyNote({ title, plainContent, linkUrl })) {
      addToast({
        variant: "error",
        content: "빈 노트는 저장할 수 없습니다",
      });

      return;
    }

    saveDraftNote(getValues());
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
