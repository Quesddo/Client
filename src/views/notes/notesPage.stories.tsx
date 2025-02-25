import NotesPage from "@/pages/notes";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NotesPage> = {
  title: "Pages/NotesPage",
  component: NotesPage,
};

export default meta;
type Story = StoryObj<typeof NotesPage>;

export const notesPage: Story = {
  render: NotesPage,
};
