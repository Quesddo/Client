import { ChangeEventHandler } from "react";
import { useFormContext } from "react-hook-form";

import InputModal from "@/components/organisms/modal/InputModal";
import { useModalContext } from "@/contexts/InputModalContext";

const setEmptyToUndefined = (value: string) =>
  value === "" ? undefined : value;

export default function LinkModal({}) {
  const { closeModal } = useModalContext();
  const methods = useFormContext();

  const resetTempUrl = () => {};

  const handleChangeTempLinkUrl: ChangeEventHandler = (e) => {
    methods.setValue(
      "tempLinkUrl",
      (e.currentTarget as HTMLInputElement).value,
      {
        shouldDirty: false,
      },
    );
  };

  const handleSubmitLink = () => {
    methods.setValue("linkUrl", methods.getValues("tempLinkUrl"), {
      shouldDirty: true,
    });
    resetTempUrl();
    closeModal();
  };

  return (
    <InputModal>
      <InputModal.Overlay className="bg-black/50" />
      <InputModal.Content className="h-[215px] w-[263px] rounded-xl sm:h-[224px] sm:w-[472px]">
        <div className="flex justify-between">
          <InputModal.Title>링크 업로드</InputModal.Title>
          <InputModal.CloseButton />
        </div>
        <div className="pt-6 pb-10">
          <InputModal.Label>링크</InputModal.Label>
          <InputModal.TextInput
            placeholder="링크를 입력하세요."
            defaultValue=""
            onChange={handleChangeTempLinkUrl}
          />
        </div>
        <input
          {...methods.register("linkUrl", {
            setValueAs: setEmptyToUndefined,
          })}
          type="hidden"
        />
        <InputModal.SubmitButton type="button" onClick={handleSubmitLink}>
          확인
        </InputModal.SubmitButton>
      </InputModal.Content>
    </InputModal>
  );
}
