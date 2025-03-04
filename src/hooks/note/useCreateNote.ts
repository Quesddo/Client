import { useMutation, useQueryClient } from "@tanstack/react-query";

import noteApi from "@/apis/noteApi";

import useToast from "../useToast";

export default function useCreateNote() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationKey: ["addNote"],
    mutationFn: noteApi.createNote,
    onSuccess: (data) => {
      addToast({
        content: "노트가 작성되었습니다.",
      });
      queryClient.invalidateQueries({ queryKey: ["notes", data.goal?.id] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      addToast({
        variant: "error",
        content: error.message,
      });
    },
  });
}
