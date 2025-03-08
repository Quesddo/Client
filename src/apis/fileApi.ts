import instance from "./apiClient";

export class FileApi {
  /**
   * 파일 업로드
   * @param file 업로드할 파일
   * @returns 업로드된 파일의 URL
   */
  async uploadFile(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await instance.post("files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      throw new Error(
        `파일 업로드 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
      );
    }
  }
}

export const fileApi = new FileApi();
