import { FormEventHandler } from "react";

import Button from "@/components/atoms/button/Button";
import PageTitle from "@/components/atoms/page-title/PageTitle";
import InputWithCount from "@/views/note-creation-form/InputWithCount";
import ToastBtn from "@/views/note-creation-form/ToastBtn";

import Editor from "./Editor";

export default function NoteCreationForm() {
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const values = Object.fromEntries(formData.entries());

    console.log(values);
  };

  return (
    <form className="max-w-[808px] px-4" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between py-[11px]">
        <PageTitle>노트 작성</PageTitle>
        <div className="flex gap-2">
          <Button
            size="xs"
            variant="outline"
            className="border-none sm:h-[44px]"
          >
            임시저장
          </Button>
          <Button size="xs" className="sm:h-[44px]" type="submit">
            작성완료
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-[11px] pb-[24px] md:flex-col-reverse">
        <input type="hidden" name="todoId" value={2} />
        <div>
          <h3>자바스크립트로 웹 서비스 만들기</h3>
          <p>자바스크립트 기초 챕터1 듣기</p>
        </div>
        <ToastBtn />
      </div>
      <InputWithCount />
      <Editor />
    </form>
  );
}
