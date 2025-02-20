"use client";

import { ReactNode } from "react";
import {
  FormProvider,
  type SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";

import Button from "@/components/atoms/button/Button";
import useSign from "@/hooks/auth/useSign";
import { SignField } from "@/types/Sign";
import { UserCreateRequstDto } from "@/types/types";

import Input from "./Input";
import Modal from "./Modal";

interface FormData extends UserCreateRequstDto {
  confirmPassword: string;
}

interface FormProps {
  children: ReactNode;
}

interface InnerFormProps {
  field: SignField[];
  path: string;
}

const Form = ({ children }: FormProps) => {
  const methods = useForm<FormData>({
    shouldFocusError: false,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

const InnerForm = ({ field, path }: InnerFormProps) => {
  const isLoginPage = path === "login" ? true : false;
  const methods = useFormContext<FormData>();
  const hooks = path === "login" ? useSign.login({}) : useSign.signup();
  let timeoutId: number;

  const handleRequest: SubmitHandler<FormData> = async (
    formData: FormData,
    event,
  ) => {
    clearTimeout(timeoutId);
    if (event?.type === "submit") {
      hooks.mutate(formData);
    } else {
      return;
    }
  };

  const handleFocus: React.FocusEventHandler = (event) => {
    clearTimeout(timeoutId);
    const { name } = event.target as HTMLInputElement;
    timeoutId = window.setTimeout(() => {
      if (!!methods.getValues(name as keyof FormData) === false) {
        methods.handleSubmit(handleRequest)();
      }
    }, 1000);
  };

  return (
    <>
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
            disabled={methods.formState.isSubmitting}
          >
            <Input.Label />
            <Input.Input />
          </Input>
        ))}
        <Button
          onClick={(e) => e.currentTarget.blur()}
          type="submit"
          className="mt-10"
          disabled={
            methods.formState.isSubmitting || !methods.formState.isValid
          }
        >
          {isLoginPage ? "로그인하기" : "회원가입하기"}
        </Button>
      </form>
      {!isLoginPage && hooks.isSuccess && <Modal />}
    </>
  );
};

Form.InnerForm = InnerForm;

export default Form;
