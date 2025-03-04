import { useMutation, useQueryClient } from "@tanstack/react-query";

import noteApi from "@/apis/noteApi";
import { UpdateNoteBodyDto } from "@/types/types";

import useToast from "../useToast";

export default function useUpdateNote(noteId: number) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationKey: ["updateNote"],
    mutationFn: (data: UpdateNoteBodyDto) => noteApi.updateNote(noteId, data),
    onSuccess: (data) => {
      addToast({
        content: "노트가 수정되었습니다.",
      });
      queryClient.invalidateQueries({ queryKey: ["notes", data.goal?.id] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["noteDetail", noteId] });
    },
    onError: (error) => {
      addToast({
        variant: "error",
        content: error.message,
      });
    },
  });
}
