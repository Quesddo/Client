import Dropdown from "./dropdown";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,

  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["md", "sm"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const dropdown: Story = {
  args: {
    size: "md",
    items: [
      { label: "수정하기", onClick: () => alert("수정하기 클릭") },
      { label: "삭제하기", onClick: () => alert("삭제하기 클릭") },
    ],
  },
};
