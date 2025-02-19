import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import instance from "@/apis/apiClient";
import { UserCreateRequstDto } from "@/types/types";

interface FormData extends UserCreateRequstDto {
  confirmPassword: string;
}

export function useLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (params: FormData) => {
      const response = await instance.post("/auth/login", params);
      return response.data;
    },
    onSuccess: () => {
      //로그인 성공 시 대시보드로 이동
      router.push("/dashboard");
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: async (params: FormData) => {
      const response = await instance.post("/user", params);
      return response.data;
    },
  });
}
