import { useMutation, useQueryClient } from "@tanstack/react-query";

import noteApi from "@/apis/noteApi";

export default function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addNote"],
    mutationFn: noteApi.createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error, _, context) => {
      alert("노트 작성 중 오류가 발생했습니다.");
    },
  });
}
