import { useMutation, useQueryClient } from "@tanstack/react-query";

import noteApi from "@/apis/noteApi";

export default function useUpdateNote(noteId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateNote"],
    mutationFn: noteApi.updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noteDetail", noteId] });
    },
    onError: (error, _, context) => {
      alert("노트 수정 중 오류가 발생했습니다.");
    },
  });
}
