import { useState } from "react";

import { sampleTodos } from "@/mocks/todo/todoMockData";

import { TodoItem } from "./TodoItem";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TodoItem> = {
  title: "views/todo/TodoItem",
  component: TodoItem,
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "375px",
            height: "667px",
          },
        },
      },
      defaultViewport: "mobile",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TodoItem>;

export const Default: Story = {
  args: {
    todo: sampleTodos[0],
    handleToggleTodo: (todoId: number, isDone: boolean) =>
      console.log(`${todoId}할일 체크 ${isDone}`),
    onOpenTodoModal: () => console.log("모달 열기"),
    onOpenDeletePopup: (todoId: number) => console.log(`${todoId}할일 삭제`),
    isNew: true,
    setIsTouchedId: (id: number | null) => console.log(`${id}클릭한 할일`),
  },
};

// 모바일 환경 터치 상태
export const MobileTouchedNShowGoal: Story = {
  args: {
    ...Default.args,
    isTouched: true,
    isShowGoal: true,
  },
  decorators: [
    (Story) => {
      const [isTouchedId, setIsTouchedId] = useState<number | null>(
        sampleTodos[0].id,
      );
      return (
        <Story
          args={{
            ...Default.args,
            isTouched: isTouchedId === sampleTodos[0].id,
            setIsTouchedId,
            isShowGoal: true,
          }}
        />
      );
    },
  ],
};
