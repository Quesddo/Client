import PageTitle from "./PageTitle";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Common/Atoms/PageTitle",
  component: PageTitle,
  argTypes: {
    title: {
      control: "text",
    },
  },
} satisfies Meta<typeof PageTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "대시보드",
  },
};
