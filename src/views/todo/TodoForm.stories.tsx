import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Button from "@/components/atoms/button/Button";
import {
  InputModalProvider,
  useModalContext,
} from "@/contexts/InputModalContext";
import { UpdateTodoBodyDto } from "@/types/types";

import { TodoForm } from "./TodoForm";
import type { Meta, StoryObj } from "@storybook/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof TodoForm> = {
  component: TodoForm,
  title: "views/todo/TodoForm",
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <InputModalProvider>
          <Story />
        </InputModalProvider>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TodoForm>;

const TodoFormWrapper = ({ isUpdate = false }) => {
  const { openModal } = useModalContext();
  const formMethods = useForm();

  const [isDone, setIsDone] = useState(false);
  const [isFileCheck, setIsFileCheck] = useState(true);
  const [isLinkCheck, setIsLinkCheck] = useState(false);
  const [selectedInput, setSelectedInput] = useState<"file" | "link">("file");

  const handleFileChange = (files: FileList) => {
    console.log("파일 선택:", files);
  };

  const handleTodoSubmit = (data: UpdateTodoBodyDto) => {
    console.log("data:", data);
  };

  const onSubmit = (
    data: UpdateTodoBodyDto,
    submitFn: (data: UpdateTodoBodyDto) => void,
  ) => {
    submitFn(data);
  };

  return (
    <FormProvider {...formMethods}>
      <Button onClick={() => openModal(isUpdate ? "updateTodo" : "createTodo")}>
        모달 열기
      </Button>
      <TodoForm
        isUpdate={isUpdate}
        isDone={isDone}
        setIsDone={setIsDone}
        formMethods={formMethods}
        isFileCheck={isFileCheck}
        setIsFileCheck={setIsFileCheck}
        isLinkCheck={isLinkCheck}
        setIsLinkCheck={setIsLinkCheck}
        selectedInput={selectedInput}
        setSelectedInput={setSelectedInput}
        handleFileChange={handleFileChange}
        handleTodoSubmit={handleTodoSubmit}
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
};

// 기본: 할 일 생성
export const CreateTodo: Story = {
  render: () => <TodoFormWrapper isUpdate={false} />,
};

// 수정 모드: 할 일 수정
export const UpdateTodo: Story = {
  render: () => <TodoFormWrapper isUpdate={true} />,
};
