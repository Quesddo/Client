import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

import ActionDropdown from "./ActionDropdown";

const meta: Meta<typeof ActionDropdown> = {
  title: "Common/atoms/ActionDropdown",
  component: ActionDropdown,
  tags: ["autodocs"],
  argTypes: {
    isOpen: { control: "boolean" },
    size: {
      options: ["sm", "md"],
      control: { type: "radio" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionDropdown>;

export const Default: Story = {
  args: {
    isOpen: true,
    size: "sm",

    items: [
      { label: "Item 1", onClick: () => alert("Item 1") },
      { label: "Item 2", onClick: () => alert("Item 2") },
      { label: "Item 3", onClick: () => alert("Item 3") },
    ],
  },
  render: function Render(args) {
    const [{ isOpen }, updateArgs] = useArgs();

    return (
      <ActionDropdown
        {...args}
        isOpen={isOpen}
        setIsOpen={(newState) => updateArgs({ isOpen: newState })}
      />
    );
  },
};
