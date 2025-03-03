import { fn } from "@storybook/test";

import ErrorFallback from "./ErrorFallback";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Common/Molecules/ErrorFallback",
  component: ErrorFallback,
  tags: ["autodocs"],
  args: { error: new Error("에러가 발생했습니다."), reset: fn() },
} satisfies Meta<typeof ErrorFallback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
