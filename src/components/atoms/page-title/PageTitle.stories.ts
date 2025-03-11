import PageTitle from "./PageTitle";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Common/atoms/PageTitle",
  component: PageTitle,
  tags: ["autodocs"],

  argTypes: {
    title: {
      control: "text",
    },
    isMobileFixed: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof PageTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "대시보드",
    isMobileFixed: false,
  },
};
