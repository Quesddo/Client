import apiRoutes from "@/router/apiRoutes";
import { UserCreateRequstDto } from "@/types/types";

import instance from "./apiClient";

interface FormData extends UserCreateRequstDto {
  confirmPassword: string;
}

export const signApi = {
  fetchLogin: async (params: FormData) => {
    const response = await instance.post(apiRoutes.auth.login(), params);
    return response.data;
  },
  createUser: async (params: FormData) => {
    const response = await instance.post(apiRoutes.user.signup(), params);
    return response.data;
  },
};
