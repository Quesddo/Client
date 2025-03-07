import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import {
  TeamIdTodosGet200Response,
  teamIdTodosGetParams,
  TodoResponseDto,
} from "@/types/types";

type FilterType = "todo" | "done";

export const useInfiniteTodo = (
  goalId?: number,
  filter?: FilterType,
  size = 40,
) => {
  return useSuspenseInfiniteQuery<
    TeamIdTodosGet200Response,
    Error,
    { todos: TodoResponseDto[]; totalCount: number }
  >({
    queryKey: ["todos", "infinite", goalId, filter],
    queryFn: async ({ pageParam = 0 }) => {
      let done;
      if (filter) {
        if (filter === "todo") {
          done = false;
        } else {
          done = true;
        }
      }
      const params: teamIdTodosGetParams = {
        cursor: pageParam as number,
        size: size,
        goalId,
        done,
      };
      const response = await instance.get("todos", { params });
      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
    select: (data) => {
      const todos = data?.pages?.flatMap((page) => page.todos ?? []) || [];
      const totalCount = data?.pages?.[0]?.totalCount ?? 0;
      return { todos, totalCount };
    },
  });
};
