import GoalItem from "./GoalItem";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof GoalItem> = {
  title: "Common/Atoms/GoalItem",
  component: GoalItem,
  argTypes: {
    goal: { control: "text" },
    iconSize: {
      control: {
        type: "radio",
        labels: {
          sm: "sm (width: 24px)",
          lg: "lg (width: 40px)",
        },
      },
      options: ["sm", "lg"],
    },
    fontSize: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    fontWeight: {
      control: "radio",
      options: ["medium", "semibold"],
    },
    gap: { control: { type: "number", min: 0, max: 20 } },
  },
};

export default meta;

type Story = StoryObj<typeof GoalItem>;

export const Default: Story = {
  args: {
    goal: "자바스크립트로 웹 서비스 만들기",
    iconSize: "sm",
    fontSize: "sm",
    fontWeight: "medium",
  },
};
