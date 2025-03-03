import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import {
  TeamIdTodosGet200Response,
  teamIdTodosGetParams,
  TodoResponseDto,
} from "@/types/types";

export const useInfiniteTodo = () => {
  return useSuspenseInfiniteQuery<
    TeamIdTodosGet200Response,
    Error,
    { todos: TodoResponseDto[]; totalCount: number }
  >({
    queryKey: ["todos"],
    queryFn: async ({ pageParam }) => {
      const params: teamIdTodosGetParams = {
        cursor: pageParam as number,
        size: 40,
      };
      const response = await instance.get("todos", { params });
      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
    select: (data) => ({
      todos: data.pages.flatMap((page) => page.todos ?? []),
      totalCount: data.pages[0]?.totalCount ?? 0,
    }),
  });
};
