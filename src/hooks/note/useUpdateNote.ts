import { useMutation, useQueryClient } from "@tanstack/react-query";

import noteApi from "@/apis/noteApi";
import { queryKeys } from "@/query-keys";
import { UpdateNoteBodyDto } from "@/types/types";

import useToast from "../useToast";

export const useUpdateNote = (noteId: number) => {
  const queryClient = useQueryClient();

  const { addToast } = useToast();

  return useMutation({
    mutationKey: ["updateNote"],
    mutationFn: (data: UpdateNoteBodyDto) => noteApi.updateNote(noteId, data),
    onSuccess: (data) => {
      const noteInfiniteQueryKey = queryKeys.note.infinite(
        data.goal?.id as number,
      ).queryKey;
      const noteDetailQueryKey = queryKeys.note.detail(noteId).queryKey;
      const todoListQueryKey = queryKeys.todo.list._def;

      addToast({
        content: "노트가 수정되었습니다.",
      });

      queryClient.invalidateQueries({ queryKey: noteInfiniteQueryKey });
      queryClient.invalidateQueries({ queryKey: noteDetailQueryKey });
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
