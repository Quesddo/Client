import { UseMutationResult } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { ReactNode } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";

import { SignField } from "@/types/Sign";
import { UserCreateRequstDto } from "@/types/types";

import Input from "./Input";

interface FormData extends UserCreateRequstDto {
  confirmPassword: string;
}

interface FormProps {
  children: ReactNode;
  field: SignField[];
  hooks: UseMutationResult<unknown, Error, FormData>;
}

const Form = ({ children, field, hooks }: FormProps) => {
  const methods = useForm<FormData>({
    shouldFocusError: false,
  });

  const handleRequest: SubmitHandler<FormData> = async (
    formData: FormData,
    event,
  ) => {
    try {
      if ("confirmPassword" in formData) {
        if (formData.confirmPassword !== formData.password) {
          methods.setError("confirmPassword", {
            type: "manual",
            message: "비밀번호가 일치하지 않습니다.",
          });
          return;
        }
      }
      //버튼이 클릭된 경우 서버요청 및 에러처리
      if (event?.type === "submit") {
        await hooks.mutateAsync(formData);
      }
    } catch (e) {
      //axios error
      if (isAxiosError(e)) {
        if (e.message.includes("이메일"))
          methods.setError("email", { type: "server", message: e.message });
        else if (e.message.includes("비밀번호")) {
          methods.setError("password", {
            type: "server",
            message: e.message,
          });
        }
        //unknown error
      } else {
        alert("알 수 없는 에러가 발생했습니다.");
      }
    }
  };

  const handleFocus = () => {
    setTimeout(() => {
      methods.handleSubmit(handleRequest);
    }, 1000);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleRequest)}
          className="mx-4 mt-10 sm:mx-13 md:mx-160"
          onBlur={methods.handleSubmit(handleRequest)}
          onFocus={handleFocus}
        >
          {field.map((item) => (
            <Input
              key={item.name}
              label={item.label}
              name={item.name}
              type={item.type}
              placeholder={item.placeholder}
              rules={item.rules}
            >
              <Input.Label />
              <Input.Input />
            </Input>
          ))}
          {children}
        </form>
      </FormProvider>
    </>
  );
};

export default Form;
