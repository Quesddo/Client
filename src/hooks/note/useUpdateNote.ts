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
      const noteListQueryKey = queryKeys.note.list(
        data.goal?.id as number,
      ).queryKey;
      const noteDetailQueryKey = queryKeys.note.detail(noteId).queryKey;

      addToast({
        content: "노트가 수정되었습니다.",
      });

      queryClient.invalidateQueries({ queryKey: noteListQueryKey });
      queryClient.invalidateQueries({ queryKey: noteDetailQueryKey });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      addToast({
        variant: "error",
        content: error.message,
      });
    },
  });
};
