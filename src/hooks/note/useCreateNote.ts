import { useMutation } from "@tanstack/react-query";

import noteApi from "@/apis/noteApi";

export default function useCreateNote() {
  return useMutation({
    mutationKey: ["addNote"],
    mutationFn: noteApi.createNote,
    onSuccess: () => {
      console.log("success");
    },
    onError: (error, _, context) => {
      console.error("error");
    },
  });
}
