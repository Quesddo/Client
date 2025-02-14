import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";

import { ErrorResponsePayload } from "@/types/types";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    // header 설정 코드
    return config;
  },
  (error) => handleError(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => handleError(error),
);

const handleError = (error: AxiosError): Promise<never> => {
  if (error.message.includes("Network Error")) {
    return Promise.reject(new Error("네트워크 오류가 발생했습니다."));
  }
  if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
    return Promise.reject(new Error("요청 시간이 초과되었습니다."));
  }

  if (!error.response) {
    return Promise.reject(new Error("서버로부터 응답이 없습니다."));
  }

  const errorMessages: Record<number, string> = {
    401: "인증에 실패했습니다.",
  };

  if (error.response) {
    const data = error.response.data as ErrorResponsePayload;
    error.message =
      errorMessages[error.response.status] ||
      data.message ||
      `오류가 발생했습니다. (코드: ${error.response.status})`;
  }

  return Promise.reject(error);
};

export default instance;
