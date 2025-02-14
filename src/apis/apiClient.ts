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

  const { status, data } = error.response;
  const serverMessage = (data as ErrorResponsePayload).message;

  // 401 고정 메시지
  if (status === 401) {
    return Promise.reject(new Error("인증에 실패했습니다."));
  }

  // 나머지는 서버 메시지 우선
  return Promise.reject(
    new Error(serverMessage || `오류가 발생했습니다: ${status}`),
  );
};

export default instance;
