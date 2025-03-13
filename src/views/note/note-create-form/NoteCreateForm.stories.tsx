import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Toaster from "@/components/organisms/toaster/Toaster";
import ToastProvider from "@/components/organisms/toaster/ToastProvider";
import { InputModalProvider } from "@/contexts/InputModalContext";

import NoteCreateForm from "./NoteCreateForm";
import type { Meta, StoryObj } from "@storybook/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof NoteCreateForm> = {
  title: "views/note/NoteCreateForm",
  component: NoteCreateForm,
  argTypes: {
    todoId: {
      control: "number",
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <InputModalProvider>
            <div className="flex h-[90dvh] flex-col overflow-y-hidden sm:flex-row">
              <div className="flex flex-1 flex-col overflow-y-auto">
                <Story />
                <Toaster />
              </div>
            </div>
          </InputModalProvider>
        </ToastProvider>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NoteCreateForm>;

export const Default: Story = {
  args: {
    todoId: 1,
  },
};
