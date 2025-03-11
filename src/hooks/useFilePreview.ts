import { useState } from "react";

export const useFilePreview = () => {
  const [previewFile, setPreviewFile] = useState<{
    url: string;
    name: string;
    type: string;
  } | null>(null);

  const updateFilePreview = (fileOrUrl: FileList | string) => {
    if (fileOrUrl instanceof FileList) {
      if (fileOrUrl.length === 0) return;
      const file = fileOrUrl[0];
      setPreviewFile({
        url: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
        name: file.name,
        type: file.type,
      });
    } else {
      // URL이 들어왔을 때 (기존 fileUrl)
      const fileUrl = fileOrUrl;
      const fileName = fileUrl.split("/").pop() || "";
      const fileExtension = fileName.split(".").pop()?.toLowerCase();

      let mimeType = "application/octet-stream";
      if (fileExtension === "jpg" || fileExtension === "jpeg") {
        mimeType = "image/jpeg";
      } else if (fileExtension === "png") {
        mimeType = "image/png";
      } else if (fileExtension === "gif") {
        mimeType = "image/gif";
      }

      const isImage = mimeType.startsWith("image/");

      setPreviewFile({
        url: isImage ? fileUrl : "",
        name: fileName,
        type: mimeType,
      });
    }
  };

  return { previewFile, updateFilePreview };
};
