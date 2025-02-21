import type { Meta } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "@/pages/login";

const queryClient = new QueryClient();

const meta: Meta<typeof Login> = {
  component: Login,
  title: "pages/sign/loginPage",
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
