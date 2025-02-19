import type { Meta } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Signup from "@/pages/signup";

const queryClient = new QueryClient();

const meta: Meta<typeof Signup> = {
  component: Signup,
  title: "pages/sign/signupPage",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;

export const Default = {};
