import Card from "./Card";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "views/notes/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Header noteId={-1} />
      <Card.Body>
        <Card.Title noteId={-1}>자바스크립트를 시작하기 전 준비물</Card.Title>
        <Card.Divider />
        <Card.Content>
          <Card.todoChip />
          <Card.TodoTitle>자바스크립트 기초 챕터2 듣기</Card.TodoTitle>
        </Card.Content>
      </Card.Body>
    </Card>
  ),
};
