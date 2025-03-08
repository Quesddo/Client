import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import instance from "@/apis/apiClient";
import {
  TeamIdTodosGet200Response,
  teamIdTodosGetParams,
  TodoResponseDto,
} from "@/types/types";

type FilterType = "todo" | "done";

interface UseInfiniteTodoProsp {
  goalId?: number;
  filter?: FilterType;
  size: number;
}

const createTodoParams = (
  pageParam: unknown,
  props?: UseInfiniteTodoProsp,
): teamIdTodosGetParams => {
  const filterMap = { todo: false, done: true };
  const done = props?.filter ? filterMap[props.filter] : undefined;
  return {
    cursor: pageParam as number,
    size: props?.size ?? 40,
    goalId: props?.goalId,
    done,
  };
};

export const useInfiniteTodo = (props?: UseInfiniteTodoProsp) => {
  return useSuspenseInfiniteQuery<
    TeamIdTodosGet200Response,
    Error,
    { todos: TodoResponseDto[]; totalCount: number }
  >({
    queryKey: ["todos", "infinite", props?.goalId, props?.filter],
    queryFn: async ({ pageParam = 0 }) => {
      const params = createTodoParams(pageParam, props);
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
