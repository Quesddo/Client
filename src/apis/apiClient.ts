import axios from "axios";
import type { AxiosError, AxiosInstance } from "axios";

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

  // error.response 존재할 때
  const errorMessages: Record<number, string> = {
    400: "잘못된 요청입니다.",
    401: "인증에 실패했습니다.",
    403: "접근 권한이 없습니다.",
    404: "요청한 페이지를 찾을 수 없습니다.",
    500: "서버에 오류가 발생했습니다.",
  };
  return Promise.reject(
    new Error(
      errorMessages[error.response.status] ||
        `오류가 발생했습니다: ${error.response.status}`,
    ),
  );
};

export default instance;
