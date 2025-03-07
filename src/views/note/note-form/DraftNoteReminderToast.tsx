import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import Button from "@/components/atoms/button/Button";
import ExitBtn from "@/components/atoms/exit-btn/ExitBtn";
import Popup from "@/components/molecules/popup/Popup";
import useNoteStorage from "@/hooks/note/useNoteStorage";
import { CreateNoteBodyDto, UpdateNoteBodyDto } from "@/types/types";

interface DraftNoteReminderToastProps {
  id: number;
  isEditMode: boolean;
}

type NoteBodyKeyType = (keyof (CreateNoteBodyDto | UpdateNoteBodyDto))[];

export default function DraftNoteReminderToast({
  id,
  isEditMode,
}: DraftNoteReminderToastProps) {
  const methods = useFormContext();

  const { isNoteDraftSaved, getDraftNoteData } = useNoteStorage({
    id,
    isEditMode,
  });

  const [isOpenToast, setIsOpenToast] = useState(isNoteDraftSaved());
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const draftNoteData = useMemo(() => getDraftNoteData(), [isOpenPopup]);

  const loadNoteDraft = () => {
    const data = getDraftNoteData();

    if (data) {
      (Object.keys(data) as NoteBodyKeyType).forEach((key) => {
        methods.setValue(key as string, data[key], {
          shouldValidate: true,
          shouldDirty: false,
        });
      });
    }
  };

  const handleCloseToast = () => {
    setIsOpenToast(false);
  };

  const handleOpenPopUp = () => {
    setIsOpenPopup(true);
  };

  const handleClosePopup = () => {
    setIsOpenPopup(false);
  };

  const handleConfirmPopup = () => {
    loadNoteDraft();
    handleClosePopup();
  };

  return (
    isOpenToast && (
      <>
        <div
          className="flex items-center justify-between gap-3 rounded-[28px] bg-blue-50 px-3 py-2.5 text-blue-500 data-[open=false]:hidden"
          data-open={isOpenToast}
        >
          <div className="flex items-center gap-4">
            <button onClick={handleCloseToast} className="group shrink-0">
              <img
                className="group-hover:brightness-[90%] group-hover:contrast-[150%]"
                src="/icons/delete_circle.png"
                alt="삭제"
                width={24}
                height={24}
              />
            </button>
            <p>임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?</p>
          </div>
          <Button
            variant="outline"
            size="xs"
            rounded
            className="shrink-0"
            onClick={handleOpenPopUp}
          >
            불러오기
          </Button>
        </div>
        {isOpenPopup && (
          <div>
            <Popup
              onClose={handleClosePopup}
              onConfirm={handleConfirmPopup}
              isCancelEnabled
            >
              <div className="flex flex-col pt-2">
                <ExitBtn
                  className="absolute top-6 right-6"
                  onClick={handleClosePopup}
                />
                <p className="flex w-full flex-col items-center">
                  <span>‘{draftNoteData?.title || "제목 없음"}’</span>
                  <span>제목의 노트를 불러오시겠어요?</span>
                </p>
              </div>
            </Popup>
          </div>
        )}
      </>
    )
  );
}
