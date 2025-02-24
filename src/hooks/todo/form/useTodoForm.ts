import { useState } from "react";
import { useForm } from "react-hook-form";

import instance from "@/apis/apiClient";
import { CreateTodoBodyDto, UpdateTodoBodyDto } from "@/types/types";

export function useTodoForm(isUpdate: boolean = false) {
  const formMethods = useForm<UpdateTodoBodyDto | CreateTodoBodyDto>();
  const { register, handleSubmit, setValue, watch, reset, control } =
    formMethods;

  const [isDone, setIsDone] = useState(false);
  const [isFileCheck, setIsFileCheck] = useState(true);
  const [isLinkCheck, setIsLinkCheck] = useState(false);
  const [selectedInput, setSelectedInput] = useState<"file" | "link">("file");

  const handleFileChange = async (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await instance.post("files", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setValue("fileUrl", response.data.url);
      } catch (error) {
        console.error("파일 업로드 오류:", error);
      }
    }
  };

  const onSubmit = (
    data: UpdateTodoBodyDto | CreateTodoBodyDto,
    handletodoSubmit: (data: UpdateTodoBodyDto | CreateTodoBodyDto) => void,
  ) => {
    if (!isFileCheck) {
      if (isUpdate) {
        data.fileUrl = null;
      } else {
        delete data.fileUrl;
      }
    }
    if (!data.linkUrl || !isLinkCheck) {
      if (isUpdate) {
        data.linkUrl = null;
      } else {
        delete data.linkUrl;
      }
    }
    if (data.goalId) data.goalId = Number(data.goalId);
    if (isUpdate) {
      (data as UpdateTodoBodyDto).done = isDone;
    }

    handletodoSubmit(data);
  };

  return {
    formMethods,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    isDone,
    setIsDone,
    isFileCheck,
    setIsFileCheck,
    isLinkCheck,
    setIsLinkCheck,
    selectedInput,
    setSelectedInput,
    handleFileChange,
    onSubmit,
  };
}
