import { InputModalProvider } from "@/contexts/InputModalContext";
import Dashboard from "@/pages/dashboard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Dashboard> = {
  title: "Pages/Dashboard",
  component: Dashboard,
  decorators: [
    (Story) => (
      <InputModalProvider>
        <Story />
      </InputModalProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

export const dashboard: Story = {
  render: Dashboard,
};
