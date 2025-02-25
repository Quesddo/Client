import TodoChip from "./TodoChip";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TodoChip> = {
  title: "Common/Atoms/TodoChip",
  component: TodoChip,
};

export default meta;

type Story = StoryObj<typeof TodoChip>;

export const todoChip: Story = {
  args: {
    isDone: true,
  },
};
