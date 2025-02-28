import { useMutation } from "@tanstack/react-query";

import noteApi from "@/apis/noteApi";

export default function useUpdateNote() {
  return useMutation({
    mutationKey: ["updateNote"],
    mutationFn: noteApi.updateNote,
    onSuccess: () => {
      console.log("success");
    },
    onError: (error, _, context) => {
      alert("노트 수정 중 오류가 발생했습니다.");
    },
  });
}
