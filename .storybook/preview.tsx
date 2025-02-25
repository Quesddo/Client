import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initialize, mswLoader } from "msw-storybook-addon";
import React from "react";

import { handlers } from "../src/mocks/handlers";
import type { Preview } from "@storybook/react";

// Initialize MSW
initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: [...handlers],
    },
  },
  tags: ["autodocs"],
  loaders: [mswLoader],

  decorators: [
    (Story) => (
      // 스토리북에서 react-query 사용을 위해 QueryClientProvider로 감싸줌
      <QueryClientProvider client={new QueryClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default preview;
