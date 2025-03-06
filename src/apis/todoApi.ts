import { FilterType } from "@/types/todo";
import { TodoResponseDto } from "@/types/types";

import instance from "./apiClient";

export const todoApi = {
  /**
   * 단일 할 일 조회
   */
  fetchTodo: async (todoId: number): Promise<TodoResponseDto> => {
    const { data } = await instance.get(`/todos/${todoId}`);
    return data;
  },

  /**
   * 할 일 리스트 조회
   * - 모든 할 일(todo, done)을 조회하려면 filter를 지정하지 마세요.
   */
  fetchTodos: async (goalId?: number, size?: number, filter?: FilterType) => {
    let isDone;
    switch (filter) {
      case "todo":
        isDone = false;
        break;
      case "done":
        isDone = true;
        break;
    }

    const params = {
      goalId,
      isDone,
      size,
    };

    const { data } = await instance.get("/todos", { params });
    return data;
  },
};
