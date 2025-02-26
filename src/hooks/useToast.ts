import { useContext } from "react";

import {
  ToastActionContext,
  ToastActionProps,
} from "@/components/organisms/toaster/ToastProvider";

export default function useToast() {
  const addToast = useContext<ToastActionProps>(ToastActionContext);

  return { addToast };
}
