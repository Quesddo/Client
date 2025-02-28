import NoteDetail from "./NoteDetail";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NoteDetail> = {
  title: "common/organisms/NoteDetail",
  component: NoteDetail,

  parameters: {
    nextjs: {
      router: {
        query: {
          noteId: "1",
          mode: "detail",
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof NoteDetail>;

export const Default: Story = {};
