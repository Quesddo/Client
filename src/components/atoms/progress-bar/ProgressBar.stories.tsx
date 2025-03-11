import type { Meta, StoryFn } from "@storybook/react";

import ProgressBar from "./ProgressBar";

const story: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: "Common/atoms/ProgressBar",
  tags: ["autodocs"],
};

const Template: StoryFn<typeof ProgressBar> = (args) => {
  return (
    <>
      <ProgressBar {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  progress: 90,
};

export default story;
