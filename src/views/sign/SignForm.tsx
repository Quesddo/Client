import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import {
  FormProvider,
  type SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";

import Button from "@/components/atoms/button/Button";
import useSign from "@/hooks/auth/useSign";
import { UserCreateRequstDto } from "@/types/types";

import { LOGIN, SIGNUP } from "./fieldSet";
import Input from "./Input";
import Modal from "./Modal";

interface SignFormData extends UserCreateRequstDto {
  confirmPassword: string;
}

interface FormProps {
  children: ReactNode;
}

const SignForm = ({ children }: FormProps) => {
  const methods = useForm<SignFormData>({
    shouldFocusError: false,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

const InnerForm = () => {
  const methods = useFormContext<SignFormData>();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login" ? true : false;
  const hooks = isLoginPage ? useSign.login() : useSign.signup();
  const field = isLoginPage ? LOGIN : SIGNUP;

  const handleRequest: SubmitHandler<SignFormData> = async (
    formData: SignFormData,
  ) => {
    hooks.mutate(formData);
  };

  return (
    <>
      <form
        onSubmit={methods.handleSubmit(handleRequest)}
        className="mx-4 mt-10 sm:mx-13"
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

SignForm.InnerForm = InnerForm;

export default SignForm;
