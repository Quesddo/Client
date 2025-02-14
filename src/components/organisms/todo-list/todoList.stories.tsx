import { sampleTodos } from "./dummy";
import TodoList from "./TodoList";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TodoList> = {
  title: "components/organisms/TodoList",
  component: TodoList,
};

export default meta;
type Story = StoryObj<typeof TodoList>;

export const Default: Story = {
  args: {
    data: sampleTodos,
    handleToggleTodo: () => {},
  },
};
