import { useContext } from "react";

import {
  ToastActionContext,
  ToastActionProps,
} from "@/components/organisms/toaster/ToastProvider";

const useToast = () => {
  const addToast = useContext<ToastActionProps>(ToastActionContext);

  return { addToast };
};

export default useToast;
