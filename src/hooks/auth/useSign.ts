import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useFormContext } from "react-hook-form";

import { signApi } from "@/apis/signApi";
import { UserCreateRequstDto } from "@/types/types";
import { tokenUtils } from "@/utils/tokenUtils/tokenUtils";

interface FormData extends UserCreateRequstDto {
  confirmPassword: string;
}

const useLogin = () => {
  const methods = useFormContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: FormData) => signApi.fetchLogin(params),
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
};

const useSignUp = () => {
  const methods = useFormContext();
  return useMutation({
    mutationFn: (params: FormData) => signApi.createUser(params),
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
};

const useSign = (isLoginPage: boolean) => {
  return isLoginPage ? useLogin : useSignUp;
};

export default useSign;
