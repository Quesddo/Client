import ExitBtn from "./ExitBtn";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ExitBtn> = {
  title: "Common/Atoms/ExitBtn",
  tags: ["autodocs"],

  component: ExitBtn,
};

export default meta;

type Story = StoryObj<typeof ExitBtn>;

export const Default: Story = {};
