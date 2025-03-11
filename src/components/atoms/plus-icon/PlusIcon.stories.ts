import PlusIcon from "./PlusIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Common/atoms/PlusIcon",
  component: PlusIcon,
  tags: ["autodocs"],

  argTypes: {
    width: {
      control: "number",
      defaultValue: 24,
    },
    height: {
      control: "number",
      defaultValue: 24,
    },
    color: {
      control: "color",
    },
    className: {
      control: "text",
    },
  },
} satisfies Meta<typeof PlusIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 24,
    height: 24,
    color: "#3b82f6",
  },
};
