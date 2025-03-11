import Button from "@/components/atoms/button/Button";
import useToast from "@/hooks/useToast";

import Toast from "./Toast";
import Toaster from "./Toaster";
import ToastProvider, { ToastStateProps } from "./ToastProvider";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Common/organisms/Toast",
  component: Toast,
  argTypes: {
    content: {
      control: "text",
    },
    delay: {
      control: "number",
      default: 2500,
    },
    autoClose: {
      control: "boolean",
    },
    variant: {
      control: "select",
      options: ["default", "error"],
    },
    size: {
      control: "select",
      options: ["default", "full"],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "기본 토스트 컴포넌트입니다.",
    variant: "default",
    size: "default",
    delay: 2500,
    autoClose: true,
    className: "",
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    content: "에러 토스트 컴포넌트입니다.",
    variant: "error",
  },
};

export const Full_Width: Story = {
  args: {
    ...Default.args,
    content: "전체 width를 차지하는 토스트 컴포넌트입니다.",
    size: "full",
  },
};

// toast trigger 예제
const ToastDemo = (args: Omit<ToastStateProps, "id" | "state">) => {
  const { addToast } = useToast();

  const handleAddToast = () => {
    addToast(args);
  };

  return (
    <div className="relative flex h-screen">
      <Button onClick={handleAddToast}>Toast 추가하기</Button>
    </div>
  );
};

export const ToastTriggerExample: StoryObj<ToastStateProps> = {
  args: Default.args,
  render: (args) => (
    <ToastProvider>
      <ToastDemo {...args} />
      <Toaster />
    </ToastProvider>
  ),
};
