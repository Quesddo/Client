import Divider from "./Divider";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Divider> = {
  title: "Common/atoms/Divider",
  tags: ["autodocs"],

  component: Divider,
  parameters: {
    docs: {
      description: {
        component:
          "기본적으로 **bg-slate-200, h-[1px]** 스타일이 적용됩니다. 두께나 색상을 변경하려면 **className**을 통해 직접 스타일을 지정해주세요.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {};
