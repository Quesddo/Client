import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";

import instance from "@/apis/apiClient";
import { UserCreateRequstDto } from "@/types/types";

interface FormData extends UserCreateRequstDto {
  confirmPassword: string;
}

interface UseLoginProps {
  redirect?: string;
}

export function useLogin({ redirect = "/dashboard" }: UseLoginProps) {
  const router = useRouter();
  const methods = useFormContext();
  return useMutation({
    mutationFn: async (params: FormData) => {
      const response = await instance.post("/auth/login", params);
      return response.data;
    },
    onSuccess: () => {
      router.push(redirect);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.message.includes("이메일"))
          methods.setError("email", { type: "server", message: error.message });
        else if (error.message.includes("비밀번호")) {
          methods.setError("password", {
            type: "server",
            message: error.message,
          });
        }
      }
    },
  });
}

export function useSignUp() {
  const methods = useFormContext();
  return useMutation({
    mutationFn: async (params: FormData) => {
      const response = await instance.post("/user", params);
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.message.includes("이메일"))
          methods.setError("email", { type: "server", message: error.message });
        else if (error.message.includes("비밀번호")) {
          methods.setError("password", {
            type: "server",
            message: error.message,
          });
        }
      }
    },
  });
}

const useSign = {
  login: useLogin,
  signup: useSignUp,
};

export default useSign;
