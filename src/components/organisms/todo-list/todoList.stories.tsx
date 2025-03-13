import { InputModalProvider } from "@/contexts/InputModalContext";
import { TodoListActionProvider } from "@/contexts/TodoListActionContext";
import { sampleTodos } from "@/mocks/todo/todoMockData";

import TodoList from "./TodoList";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TodoList> = {
  title: "common/organisms/TodoList",
  component: TodoList,
  decorators: [
    (Story) => (
      <InputModalProvider>
        <TodoListActionProvider>
          <Story />
        </TodoListActionProvider>
      </InputModalProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TodoList>;

export const Default: Story = {
  args: {
    data: sampleTodos,
    handleToggleTodo: () => {},
  },
};
