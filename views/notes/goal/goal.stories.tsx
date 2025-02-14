import Goal from "./goal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Goal> = {
  title: "views/notes/Goal",
  component: Goal,
};

export default meta;
type Story = StoryObj<typeof Goal>;

export const goal: Story = {
  render: () => <Goal />,
};
