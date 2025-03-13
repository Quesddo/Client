import { useMutation, useQueryClient } from "@tanstack/react-query";

import noteApi from "@/apis/noteApi";
import { queryKeys } from "@/query-keys";

import useToast from "../useToast";

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationKey: ["addNote"],
    mutationFn: noteApi.createNote,
    onSuccess: (data) => {
      const noteInfiniteQueryKey = queryKeys.note.infinite(
        data.goal?.id as number,
      ).queryKey;
      const todoListQueryKey = queryKeys.todo.list._def;

      addToast({
        content: "노트가 작성되었습니다.",
      });
      queryClient.invalidateQueries({
        queryKey: noteInfiniteQueryKey,
      });
      queryClient.invalidateQueries({ queryKey: todoListQueryKey });
    },
    onError: (error) => {
      addToast({
        variant: "error",
        content: error.message,
      });
    },
  });
};
