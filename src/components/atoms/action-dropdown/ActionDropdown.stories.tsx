import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

import Dropdown from "./ActionDropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    isOpen: { control: "boolean" },
    size: {
      options: ["sm", "md"],
      control: { type: "radio" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

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
      <Dropdown
        {...args}
        isOpen={isOpen}
        setIsOpen={(newState) => updateArgs({ isOpen: newState })}
      />
    );
  },
};
