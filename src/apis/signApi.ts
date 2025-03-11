import { UserCreateRequstDto } from "@/types/types";

import instance from "./apiClient";

interface FormData extends UserCreateRequstDto {
  confirmPassword: string;
}

export const signApi = {
  fetchLogin: async (params: FormData) => {
    const response = await instance.post("/auth/login", params);
    return response.data;
  },
  createUser: async (params: FormData) => {
    const response = await instance.post("/user", params);
    return response.data;
  },
};
