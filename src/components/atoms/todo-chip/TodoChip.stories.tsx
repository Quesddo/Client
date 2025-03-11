import TodoChip from "./TodoChip";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TodoChip> = {
  title: "Common/atoms/TodoChip",
  tags: ["autodocs"],

  component: TodoChip,
};

export default meta;

type Story = StoryObj<typeof TodoChip>;

export const Default: Story = {
  args: {
    isDone: true,
  },
};
