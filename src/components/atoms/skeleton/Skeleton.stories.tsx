import type { Meta } from "@storybook/react";

import Skeleton from "./Skeleton";

const story: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: "Common/Atoms/Skeleton",
  tags: ["autodocs"],
  decorators: [
    (story) => <div style={{ width: "200px", height: "100px" }}>{story()}</div>,
  ],
};

export default story;

export const Default = {};
