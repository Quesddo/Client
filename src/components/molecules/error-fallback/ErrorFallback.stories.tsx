import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "./ErrorFallback";
import type { Meta, StoryObj } from "@storybook/react";

const ThrowError = () => {
  throw new Error("Storybook 테스트 에러!");
};

const meta = {
  title: "Common/molecules/ErrorFallback",
  component: ErrorFallback,
  tags: ["autodocs"],
  args: {
    error: new Error("에러가 발생했습니다."),
  },
} satisfies Meta<typeof ErrorFallback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThrowError />
    </ErrorBoundary>
  ),
};
