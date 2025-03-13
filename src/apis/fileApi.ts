import apiRoutes from "@/router/apiRoutes";

import instance from "./apiClient";

export const uploadFile = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await instance.post(apiRoutes.file.upload(), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `파일 업로드 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
    );
  }
};
