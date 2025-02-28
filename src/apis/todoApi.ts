import { TodoResponseDto } from "@/types/types";

import instance from "./apiClient";

export const todoApi = {
  fetchTodo: async (todoId: number): Promise<TodoResponseDto> => {
    const { data } = await instance.get(`/todos/${todoId}`);

    return data;
  },
};
