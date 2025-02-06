import axios from "axios";
import type { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    // header 설정 코드
    return config;
  },
  (error) => console.log(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => console.log(error),
);

export default instance;
