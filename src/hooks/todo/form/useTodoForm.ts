import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { uploadFile } from "@/apis/fileApi";
import useToast from "@/hooks/useToast";
import { TodoResponseDto, UpdateTodoBodyDto } from "@/types/types";

interface TodoFormOptions {
  isUpdate?: boolean;
  todo?: TodoResponseDto;
  goalId?: number;
}

export function useTodoForm({ isUpdate, todo, goalId }: TodoFormOptions) {
  const { addToast } = useToast();
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
        const response = await uploadFile(file);
        setValue("fileUrl", response.url);
      } catch (error) {
        addToast({
          variant: "error",
          content: "파일 업로드에 실패했습니다.",
        });
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
