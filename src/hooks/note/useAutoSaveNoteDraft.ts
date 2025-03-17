import { useEffect, useRef } from "react";
import {
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";

import useToast from "../useToast";
import { useNoteStorage } from "./useNoteStorage";

interface UseAutoSaveNoteDraftProps<T extends FieldValues> {
  id: number;
  methods: UseFormReturn<T>;
  isEditMode: boolean;
}

const TOAST_INTERVAL_TIME = 1000 * 60 * 5;

const isEmptyNote = (items: { [key: string]: string | null | undefined }) => {
  return Object.values(items).every(
    (item) => !item || item.trim().length === 0,
  );
};

export const useAutoSaveNoteDraft = <T extends FieldValues>({
  id,
  methods,
  isEditMode,
}: UseAutoSaveNoteDraftProps<T>) => {
  const {
    getValues,
    formState: { isDirty },
  } = methods;
  const { addToast } = useToast();
  const { saveDraftNote } = useNoteStorage({ id, isEditMode });

  const toastIntervalRef = useRef<NodeJS.Timeout>(null);

  const saveDraftNoteAndShowToast = () => {
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
      const [title, plainContent, linkUrl] = getValues([
        "title",
        "plainContent",
        "linkUrl",
      ] as Path<T>[]);

      console.log(isEmptyNote({ title, plainContent, linkUrl }));
      if (isEmptyNote({ title, plainContent, linkUrl })) {
        return;
      }

      saveDraftNoteAndShowToast();
    }, TOAST_INTERVAL_TIME);
  };

  const handleClickSaveDraft = () => {
    const [title, plainContent, linkUrl] = getValues([
      "title",
      "plainContent",
      "linkUrl",
    ] as Path<T>[]);

    if (isEmptyNote({ title, plainContent, linkUrl })) {
      addToast({
        variant: "error",
        content: "빈 노트는 저장할 수 없습니다",
      });

      return;
    }

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
