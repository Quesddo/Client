import Card from "./card";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "views/notes/Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const card: Story = {
  render: () => (
    <Card>
      <Card.Header />
      <Card.Body>
        <Card.Title>할 일 목록</Card.Title>
        <Card.Divider />
        <Card.Content>UI 컴포넌트 작업</Card.Content>
      </Card.Body>
    </Card>
  ),
};
