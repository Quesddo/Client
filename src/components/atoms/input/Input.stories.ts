import Input from "@/components/atoms/input/Input";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Common/atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {
        type: "radio",
        labels: {
          default: "default (text-base)",
          lg: "lg (height: 48px, text-base)",
          sm: "sm (height: 44px, text-sm)",
        },
      },
      options: ["default", "lg", "sm", "xs"],
      description: `default: w-full, 나머지: 특정 width 고정 
      \n\n default: 모바일 height: 44px, 태블릿 height: 48px`,
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "default",
    placeholder: "enter a value",
    defaultValue: "",
  },
};
