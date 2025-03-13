import { InputModalProvider } from "@/contexts/InputModalContext";
import { TodoListActionProvider } from "@/contexts/TodoListActionContext";
import TodoPage from "@/pages/todo";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TodoPage> = {
  title: "Pages/todo/TodoPage",
  component: TodoPage,
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

type Story = StoryObj<typeof TodoPage>;

export const Default: Story = {
  render: () => <TodoPage />,
};
