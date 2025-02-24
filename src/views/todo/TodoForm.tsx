import { FormProvider } from "react-hook-form";

import InputModal from "@/components/organisms/modal/InputModal";
import { useFetchGoals } from "@/hooks/goal/useFetchGoals";
import { CreateTodoBodyDto, UpdateTodoBodyDto } from "@/types/types";
import { cn } from "@/utils/cn";

import TodoUpdateFormCheckbox from "./todo-checkbox/TodoUpdateFormCheckbox";
import type { UseFormReturn } from "react-hook-form";

type TodoFormData = CreateTodoBodyDto | UpdateTodoBodyDto;

interface TodoFormProps {
  isUpdate?: boolean;
  isDone?: boolean;
  setIsDone?: (value: boolean) => void;
  formMethods: UseFormReturn<TodoFormData>;

  isFileCheck: boolean;
  setIsFileCheck: (value: boolean) => void;
  isLinkCheck: boolean;
  setIsLinkCheck: (value: boolean) => void;
  selectedInput: "file" | "link";
  setSelectedInput: (value: "file" | "link") => void;

  handleFileChange: (files: FileList) => void;
  handletodoSubmit: (data: TodoFormData) => void;
  onSubmit: (
    data: TodoFormData,
    handletodoSubmit: (data: TodoFormData) => void,
  ) => void;
}

export function TodoForm({
  isUpdate,
  isDone,
  setIsDone,
  formMethods,
  isFileCheck,
  setIsFileCheck,
  isLinkCheck,
  setIsLinkCheck,
  selectedInput,
  setSelectedInput,
  handleFileChange,
  handletodoSubmit,
  onSubmit,
}: TodoFormProps) {
  const fetchGoalList = useFetchGoals();
  const goals = fetchGoalList.data?.goals || [];

  const { register, handleSubmit, watch, control } = formMethods;

  const title = watch("title");
  const titleCounting = title?.length || 0;

  return (
    <FormProvider {...formMethods}>
      <InputModal>
        <InputModal.Overlay />
        <InputModal.Content
          className={cn(
            "flex flex-col gap-6 sm:max-h-[628px] sm:w-[472px] sm:rounded-xl",
            isUpdate && "sm:max-h-[726px]",
          )}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <InputModal.Title>
                할 일 {isUpdate ? "수정" : "생성"}
              </InputModal.Title>
              <InputModal.CloseButton />
            </div>
            {isUpdate && setIsDone && (
              <TodoUpdateFormCheckbox
                done={isDone || false}
                setIsDone={setIsDone}
              />
            )}
          </div>

          <form
            onSubmit={handleSubmit((data) => onSubmit(data, handletodoSubmit))}
            className="flex flex-col gap-6"
          >
            <div>
              <InputModal.Label>
                제목 <span>{titleCounting}/30</span>
              </InputModal.Label>

              <InputModal.TextInput
                type="text"
                placeholder="할 일의 제목을 적어주세요"
                maxLength={30}
                {...register("title")}
              />
            </div>

            <div>
              <InputModal.Label>자료</InputModal.Label>
              <div className="mb-3 flex gap-3">
                <InputModal.CheckButton
                  checked={isFileCheck}
                  onToggle={() => {
                    setIsFileCheck(!isFileCheck);
                    setSelectedInput("file");
                  }}
                >
                  파일 업로드
                </InputModal.CheckButton>
                <InputModal.CheckButton
                  checked={isLinkCheck}
                  onToggle={() => {
                    setIsLinkCheck(!isLinkCheck);
                    setSelectedInput("link");
                  }}
                >
                  링크 첨부
                </InputModal.CheckButton>
              </div>

              <InputModal.FileInput
                fileUrl={watch("fileUrl") || undefined}
                onFileChange={handleFileChange}
                className={cn(selectedInput === "link" && "hidden")}
              />
              {selectedInput === "link" && (
                <InputModal.TextInput
                  type="url"
                  placeholder="영상이나 글, 파일의 링크를 넣어주세요"
                  {...register("linkUrl")}
                ></InputModal.TextInput>
              )}
            </div>

            <div>
              <InputModal.Label>목표</InputModal.Label>
              <InputModal.DropdownInput
                name="goalId"
                control={control}
                dropdownItems={goals}
                buttonText={"목표를 선택해주세요"}
              ></InputModal.DropdownInput>
            </div>

            <InputModal.SubmitButton
              disabled={!title}
              className="absolute bottom-6 w-[calc(100%-48px)]"
            >
              확인
            </InputModal.SubmitButton>
          </form>
        </InputModal.Content>
      </InputModal>
    </FormProvider>
  );
}
