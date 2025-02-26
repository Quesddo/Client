import Card from "./Card";
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
        <Card.Title>자바스크립트를 시작하기 전 준비물</Card.Title>
        <Card.Divider />
        <Card.Content>
          <Card.todoChip />
          <Card.TodoTitle>자바스크립트 기초 챕터2 듣기</Card.TodoTitle>
        </Card.Content>
      </Card.Body>
    </Card>
  ),
};
