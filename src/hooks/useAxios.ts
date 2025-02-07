import { useEffect, useState } from "react";

import apiClient from "@/apis/apiClient";

type HttpMethod = "get" | "post" | "put" | "delete";

interface RequestParams<T> {
  url: string;
  method: HttpMethod;
  initialData: T;
  body?: Record<string, unknown> | null;
  shouldFetchOnMount?: boolean;
}

interface RequestOptions {
  body?: Record<string, unknown> | null;
}

const useAxios = <T, R = T>({
  url,
  method,
  initialData,
  body,
  shouldFetchOnMount,
}: RequestParams<T>) => {
  const [data, setData] = useState<R | T>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async (options?: RequestOptions) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const requestBody = options?.body ?? body ?? {};
      const response = await apiClient[method](url, requestBody);
      setData(response.data);
    } catch (err) {
      // 인터셉터에서 처리되지 않은 에러
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (method === "get" && shouldFetchOnMount) {
      handleRequest();
    }
  }, [method, url, shouldFetchOnMount]);

  return {
    data,
    isLoading,
    error,
    handleRequest,
  };
};

export { useAxios };
