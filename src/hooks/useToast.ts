import { useContext } from "react";

import { ToastActionContext } from "@/components/organisms/toaster/ToastProvider";

export default function useToast() {
  const addToast = useContext(ToastActionContext);

  return { addToast };
}
