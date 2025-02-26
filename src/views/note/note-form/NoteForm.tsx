import { PropsWithChildren } from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";

import Button from "@/components/atoms/button/Button";
import PageTitle from "@/components/atoms/page-title/PageTitle";
import useNoteDraft from "@/hooks/note/useNoteDraft";
import { CreateNoteBodyDto, UpdateNoteBodyDto } from "@/types/types";
import Editor from "@/views/note/note-form/Editor";
import InputWithCount from "@/views/note/note-form/InputWithCount";
import ToastBtn from "@/views/note/note-form/ToastBtn";

interface NoteFormProps<TNoteBody extends CreateNoteBodyDto | UpdateNoteBodyDto>
  extends PropsWithChildren {
  id: number;
  methods: UseFormReturn<TNoteBody>;
  onSubmit: (data: TNoteBody) => void;
}

export default function NoteForm<
  TNoteBody extends CreateNoteBodyDto | UpdateNoteBodyDto,
>({ id, methods, onSubmit, children }: NoteFormProps<TNoteBody>) {
  const { handleClickSaveDraft, handleLoadNoteDraft, isNoteDraftSaved } =
    useNoteDraft({
      id,
      methods,
    });

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-1 flex-col"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-between py-[11px]">
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
            <Button size="xs" className="sm:h-[44px]" type="submit">
              작성완료
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-[11px] pb-[24px] md:flex-col-reverse">
          <div>
            <h3>자바스크립트로 웹 서비스 만들기</h3>
            <p>자바스크립트 기초 챕터1 듣기</p>
          </div>
          <ToastBtn
            isOpen={isNoteDraftSaved()}
            onLoadData={handleLoadNoteDraft}
          />
        </div>
        <InputWithCount />
        <Editor />
        {children}
      </form>
    </FormProvider>
  );
}
