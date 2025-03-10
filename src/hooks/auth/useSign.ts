import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useFormContext } from "react-hook-form";

import instance from "@/apis/apiClient";
import { UserCreateRequstDto } from "@/types/types";
import { tokenUtils } from "@/utils/tokenUtils";

interface FormData extends UserCreateRequstDto {
  confirmPassword: string;
}

function useLogin() {
  const methods = useFormContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: FormData) => {
      const response = await instance.post("/auth/login", params);
      return response.data;
    },
    onSuccess: (data) => {
      tokenUtils.setToken(data.accessToken, data.refreshToken);
      queryClient.invalidateQueries({ queryKey: ["user"] });
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

function useSignUp() {
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

function useSign(isLoginPage: boolean) {
  if (isLoginPage) {
    return useLogin;
  }
  return useSignUp;
}
export default useSign;
