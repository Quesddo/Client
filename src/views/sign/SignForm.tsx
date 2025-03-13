import { useRouter } from "next/router";
import { ReactNode } from "react";
import {
  FormProvider,
  type SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";

import Button from "@/components/atoms/button/Button";
import Popup from "@/components/molecules/popup/Popup";
import useSign from "@/hooks/auth/useSign";
import pageRoutes from "@/router/pageRoutes";
import { UserCreateRequstDto } from "@/types/types";

import { LOGIN, SIGNUP } from "./fieldSet";
import SignInput from "./SignInput";

interface SignFormData extends UserCreateRequstDto {
  confirmPassword: string;
}

interface FormProps {
  children: ReactNode;
}

const SignForm = ({ children }: FormProps) => {
  const methods = useForm<SignFormData>({
    shouldFocusError: false,
    mode: "onChange",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

const InnerForm = () => {
  const methods = useFormContext<SignFormData>();
  const router = useRouter();
  const isLoginPage = router.asPath === "/login";
  const field = isLoginPage ? LOGIN : SIGNUP;
  const hooks = useSign(isLoginPage)();

  const handleRequest: SubmitHandler<SignFormData> = async (
    formData: SignFormData,
  ) => {
    hooks.mutate(formData);
  };

  const onClickCloseModal = () => {
    router.push(pageRoutes.login());
  };

  return (
    <>
      <form
        onSubmit={methods.handleSubmit(handleRequest)}
        className="mx-4 mt-10 sm:mx-13"
      >
        {field.map((item) => (
          <SignInput
            key={item.name}
            label={item.label}
            name={item.name}
            type={item.type}
            placeholder={item.placeholder}
            rules={item.rules}
          >
            <SignInput.Label />
            <SignInput.Input />
          </SignInput>
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

      {!isLoginPage && hooks.isSuccess && (
        <Popup
          onClose={onClickCloseModal}
          onConfirm={onClickCloseModal}
          isCancelEnabled={false}
        >
          <h2 className="my-4 text-base">가입이 완료되었습니다!</h2>
        </Popup>
      )}
    </>
  );
};

SignForm.InnerForm = InnerForm;

export default SignForm;
