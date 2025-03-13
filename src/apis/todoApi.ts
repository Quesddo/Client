import { FilterType } from "@/types/todo";
import { TodoResponseDto, UpdateTodoBodyDto } from "@/types/types";

import instance from "./apiClient";

const todoApi = {
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
    let done;
    switch (filter) {
      case "todo":
        done = false;
        break;
      case "done":
        done = true;
        break;
    }

    const params = {
      goalId,
      done,
      size,
    };

    const { data } = await instance.get("/todos", { params });
    return data;
  },

  fetchProgress: async (goalId?: number) => {
    const res = await instance.get(`/todos/progress?goalId=${goalId ?? ""}`);
    return res.data;
  },

  createTodo: async (body: UpdateTodoBodyDto): Promise<TodoResponseDto> => {
    const { data } = await instance.post("/todos", body);
    return data;
  },

  updateTodo: async (
    todoId: number,
    body: UpdateTodoBodyDto,
  ): Promise<TodoResponseDto> => {
    const { data } = await instance.patch(`/todos/${todoId}`, body);
    return data;
  },

  deleteTodo: async (todoId: number) => {
    const { data } = await instance.delete(`/todos/${todoId}`);
    return data;
  },
};

export default todoApi;
