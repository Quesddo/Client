import type { Meta, StoryObj } from "@storybook/react";

import { InputModalProvider } from "@/contexts/InputModalContext";

import Sidebar from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "views/layouts/sidebar",
  component: Sidebar,
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "375px",
            height: "812px",
          },
        },
        tablet_sm: {
          name: "Tablet_sm",
          styles: {
            width: "744px",
            height: "1133px",
          },
        },
        tablet_lg: {
          name: "Tablet_lg",
          styles: {
            width: "964px",
            height: "1133px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1520px",
            height: "1080px",
          },
        },
      },
      defaultViewport: "desktop", // ✅ 커스텀 뷰포트 적용
    },
  },
  render: () => {
    <InputModalProvider>
      <Sidebar />
    </InputModalProvider>;
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
  },
};

export const Tablet_Small: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet_sm",
    },
  },
};

export const Tablet_Large: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet_lg",
    },
  },
};

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};
