import { useArgs } from "@storybook/preview-api";

import NoteDetail from "./NoteDetail";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NoteDetail> = {
  title: "components/organisms/NoteDetail",
  component: NoteDetail,
};

export default meta;

type Story = StoryObj<typeof NoteDetail>;

export const Default: Story = {
  args: { noteId: 1 },
  render: function Render(args) {
    const [{ noteId }, updateArgs] = useArgs();

    return (
      <NoteDetail
        {...args}
        noteId={noteId}
        setNoteId={(newNoteId) => updateArgs({ noteId: newNoteId })}
      />
    );
  },
};
