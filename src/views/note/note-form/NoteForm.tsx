import { useRouter } from "next/router";
import { PropsWithChildren, useState } from "react";
import {
  type FieldValues,
  FormProvider,
  type Path,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";

import Button from "@/components/atoms/button/Button";
import ExitBtn from "@/components/atoms/exit-btn/ExitBtn";
import PageTitle from "@/components/atoms/page-title/PageTitle";
import Popup from "@/components/molecules/popup/Popup";
import { useAutoSaveNoteDraft } from "@/hooks/note/useAutoSaveNoteDraft";
import { useBlockNavigation } from "@/hooks/note/useBlockNavigation";
import EmbeddedContent from "@/views/note/note-detail/components/EmbeddedContent";
import DraftNoteReminderToast from "@/views/note/note-form/components/DraftNoteReminderToast";
import Editor from "@/views/note/note-form/components/Editor";
import TitleWithCounter from "@/views/note/note-form/components/TitleWithCounter";

import EditorTextCounter from "./components/EditorTextCounter";
import GoalTodoDisplay from "./components/GoalTodoDisplay";
import LinkDisplay from "./components/LinkDisplay";
import LinkModal from "./components/LinkModal";

interface NoteFormProps<T extends FieldValues> extends PropsWithChildren {
  id: number;
  methods: UseFormReturn<T>;
  editMode?: boolean;
  onSubmit: SubmitHandler<T>;
  goal?: string;
  todo?: string;
}

export default function NoteForm<T extends FieldValues>({
  id,
  methods,
  onSubmit,
  editMode = false,
  children,
}: NoteFormProps<T>) {
  const router = useRouter();

  const {
    formState: { isValid, isSubmitSuccessful, isDirty },
  } = methods;

  const { handleClickSaveDraft } = useAutoSaveNoteDraft({
    id,
    methods,
    isEditMode: editMode,
  });

  const { isPopupOpen, handleCanclePopup, handleConfirmPopup } =
    useBlockNavigation({
      isPageMoveRestricted:
        // (1. 제출되지 않음 상태) + [(2. 수정 모드) or (3. 글 작성 시도한 경우)]
        !isSubmitSuccessful && (editMode || isDirty),
    });

  const [isEmbedOpen, setIsEmbedOpen] = useState(false);

  const wacthedLinkUrl = methods.watch("linkUrl" as Path<T>)?.toString();

  const handleToggleEmbedOpen = () => {
    setIsEmbedOpen((prev) => !prev);
  };

  return (
    <>
      <div className="fixed inset-0 z-20 flex justify-end bg-black/50">
        <section className="box-border flex w-full flex-col gap-4 overflow-y-auto bg-white p-6 sm:left-auto sm:w-[512px] sm:border-l sm:border-slate-200 md:w-[800px]">
          <ExitBtn onClick={router.back} className="self-end" />

          {/* 링크 embed 영역 (링크가 존재할 경우만 표시) */}
          <EmbeddedContent isOpen={isEmbedOpen} linkUrl={wacthedLinkUrl} />

          <FormProvider {...methods}>
            <form
              className="flex min-h-0 flex-1 flex-col"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <div className="flex items-center justify-between">
                <PageTitle title="노트 작성" />
                <div className="flex gap-2">
                  <Button
                    size="xs"
                    variant="outline"
                    className="border-none sm:h-[44px]"
                    onClick={handleClickSaveDraft}
                  >
                    임시저장
                  </Button>
                  <Button
                    size="xs"
                    className="sm:h-[44px]"
                    type="submit"
                    disabled={!isValid}
                  >
                    작성완료
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-[11px] pb-[24px] sm:pt-4 md:flex-col-reverse">
                <GoalTodoDisplay />
                <DraftNoteReminderToast id={id} isEditMode={editMode} />
              </div>
              <TitleWithCounter />
              <div className="flex min-h-0 flex-1 flex-col gap-2">
                <EditorTextCounter />
                <LinkDisplay onClick={handleToggleEmbedOpen} />
                <Editor />
              </div>
              <div className="-mt-4">
                <LinkModal />
              </div>
              {children}
            </form>
          </FormProvider>
        </section>
      </div>

      {/* 작성 중 나가기 안내 모달 */}
      {isPopupOpen && (
        <Popup
          onClose={handleCanclePopup}
          onConfirm={handleConfirmPopup}
          isCancelEnabled
        >
          <p>정말 나가시겠어요?</p>
          <p>{!editMode ? "작성" : "수정"}된 내용이 모두 삭제됩니다.</p>
        </Popup>
      )}
    </>
  );
}
