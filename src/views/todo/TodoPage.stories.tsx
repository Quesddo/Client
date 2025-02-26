import { InputModalProvider } from "@/contexts/InputModalContext";
import { todoHandlers } from "@/mocks/todo/todoHandlers";

import TodoPage from "../../pages/todo";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TodoPage> = {
  component: TodoPage,
  title: "Pages/TodoPage",
  decorators: [
    (Story) => (
      <InputModalProvider>
        <Story />
      </InputModalProvider>
    ),
  ],
  parameters: {
    msw: {
      handlers: todoHandlers,
    },
  },
};

export default meta;

type Story = StoryObj<typeof TodoPage>;

export const Default: Story = {
  render: () => <TodoPage />,
};
