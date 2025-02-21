import { useState } from "react";

export default function useFilePreview() {
  const [previewFile, setPreviewFile] = useState<{
    url: string;
    name: string;
    type: string;
  } | null>(null);

  const updateFilePreview = (files: FileList) => {
    if (files.length === 0) return;
    const file = files[0];
    setPreviewFile({
      url: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
      name: file.name,
      type: file.type,
    });
  };

  return { previewFile, updateFilePreview };
}
