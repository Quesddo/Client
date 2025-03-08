import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import instance from "@/apis/apiClient";
import { fileApi } from "@/apis/fileApi";
import { TodoResponseDto, UpdateTodoBodyDto } from "@/types/types";

export function useTodoForm(
  isUpdate: boolean = false,
  todo?: TodoResponseDto,
  goalId?: number,
) {
  const formMethods = useForm<UpdateTodoBodyDto>();
  const { reset, setValue } = formMethods;

  const [isDone, setIsDone] = useState(false);
  const [isFileCheck, setIsFileCheck] = useState(true);
  const [isLinkCheck, setIsLinkCheck] = useState(false);
  const [selectedInput, setSelectedInput] = useState<"file" | "link">("file");

  const handleFileChange = async (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      try {
        const response = await fileApi.uploadFile(file);
        setValue("fileUrl", response.url);
      } catch (error) {
        console.error("파일 업로드 오류:", error);
      }
    }
  };

  useEffect(() => {
    if (todo) {
      reset(todo);
      setIsDone(todo.done || false);

      if (todo.fileUrl) setValue("fileUrl", todo.fileUrl);
      setIsFileCheck(!!todo.fileUrl);
      if (todo.linkUrl) setSelectedInput("link");
      setIsLinkCheck(!!todo.linkUrl);
      if (todo.goal?.id) setValue("goalId", todo.goal.id);
    } else if (!isUpdate && goalId) {
      setValue("goalId", goalId);
    }
  }, [todo, goalId, isUpdate]);

  const onSubmit = (
    data: UpdateTodoBodyDto,
    handleTodoSubmit: (data: UpdateTodoBodyDto) => void,
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
      data.done = isDone;
    }

    handleTodoSubmit(data);
  };

  return {
    formMethods,
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
