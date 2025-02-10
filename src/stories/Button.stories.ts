import { fn } from "@storybook/test";

import Button from "@/components/atoms/Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Common/Atomic/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "outline"],
      defaultValue: "default",
    },
    size: {
      control: {
        type: "radio",
        labels: {
          default: "default (height: 48px, text-base)",
          lg: "lg (height: 48px, text-base)",
          sm: "sm (height: 44px, text-sm)",
          xs: "xs (height: 44px, text-sm)",
        },
      },
      options: ["default", "lg", "sm", "xs"],
      description: "default: w-full, 나머지: 특정 width 고정",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Button",
  },
};

export const Width: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Button",
    className: "w-[200px]",
  },
};

export const Disabled: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Button",
    disabled: true,
  },
};
