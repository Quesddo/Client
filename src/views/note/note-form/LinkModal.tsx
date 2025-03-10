import { ChangeEventHandler } from "react";
import { useFormContext } from "react-hook-form";

import ExitBtn from "@/components/atoms/exit-btn/ExitBtn";
import InputModal from "@/components/organisms/modal/InputModal";
import { useModalContext } from "@/contexts/InputModalContext";

const setEmptyToUndefined = (value: string) =>
  value === "" ? undefined : value;

export default function LinkModal({}) {
  const { closeModal } = useModalContext();
  const methods = useFormContext();

  const { watch } = methods;
  const tempLinkUrl = watch("tempLinkUrl");
  const isValid = /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(
    tempLinkUrl,
  );

  const resetTempUrl = () => {
    methods.setValue("tempLinkUrl", "", {
      shouldDirty: false,
    });
  };

  const handleChangeTempLinkUrl: ChangeEventHandler = (e) => {
    methods.setValue(
      "tempLinkUrl",
      (e.currentTarget as HTMLInputElement).value,
      {
        shouldDirty: false,
      },
    );
  };

  const handleCloseModal = () => {
    resetTempUrl();
    closeModal();
  };

  const handleSubmitLink = () => {
    methods.setValue("linkUrl", methods.getValues("tempLinkUrl"), {
      shouldDirty: true,
    });
    handleCloseModal();
  };

  return (
    <InputModal>
      <InputModal.Overlay className="bg-black/50" />
      <InputModal.Content className="h-[215px] w-[263px] rounded-xl sm:h-[224px] sm:w-[472px]">
        <div className="flex justify-between">
          <InputModal.Title>링크 업로드</InputModal.Title>
          <ExitBtn onClick={handleCloseModal} />
        </div>
        <div className="h-[80px] pt-6 pb-10">
          <InputModal.Label>링크</InputModal.Label>
          <InputModal.TextInput
            placeholder="링크를 입력하세요."
            defaultValue=""
            onChange={handleChangeTempLinkUrl}
          />
          {!isValid && tempLinkUrl && (
            <p className="mt-1 px-2 text-sm font-normal text-red-600">
              유효하지 않은 링크 주소입니다.
            </p>
          )}
        </div>
        <input
          {...methods.register("linkUrl", {
            setValueAs: setEmptyToUndefined,
          })}
          type="hidden"
        />
        <InputModal.SubmitButton
          type="button"
          onClick={handleSubmitLink}
          disabled={!isValid}
        >
          확인
        </InputModal.SubmitButton>
      </InputModal.Content>
    </InputModal>
  );
}
