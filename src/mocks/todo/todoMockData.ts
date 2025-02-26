import { TeamIdTodosGet200Response } from "@/types/types";

export const todoListMockData = (): TeamIdTodosGet200Response => ({
  todos: [
    {
      id: 1,
      teamId: "quesddo",
      userId: 1,
      done: true,
      noteId: null,
      goal: { id: 1, title: "매일 꾸준히 운동하기" },
      linkUrl: null,
      fileUrl: "https://github.com/Quesddo/Client",
      updatedAt: "2024-02-25T12:00:00Z",
      createdAt: "2024-02-25T12:00:00Z",
      title: "달리기",
    },
    {
      id: 2,
      teamId: "quesddo",
      userId: 1,
      done: true,
      noteId: 101,
      goal: null,
      linkUrl: "https://github.com/Quesddo/Client",
      fileUrl: null,
      updatedAt: "2024-02-26T12:00:00Z",
      createdAt: "2024-02-25T12:00:00Z",
      title: "공부하기",
    },
  ],
  totalCount: 2,
  nextCursor: null,
});
