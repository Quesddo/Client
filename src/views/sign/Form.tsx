import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

import { FormProvider, useForm } from "react-hook-form";

import signAxios from "@/apis/sign/";
import Button from "@/components/atoms/button/Button";
import type { LoginRequest, Path, UserCreateRequst } from "@/types/auth";

import FIELD_SET from "./field-set";
import Input from "./Input";
import Modal from "./Modal";
import type { FieldValues } from "react-hook-form";

const Form = ({ path }: { path: Path }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const hookForm = useForm();
  const router = useRouter();

  const field = FIELD_SET[path];
  const apiUrl = path === "signup" ? "/user" : "/auth/login";

  const handleRequest = async (
    formData: FieldValues | UserCreateRequst | LoginRequest,
  ) => {
    try {
      await signAxios.post(apiUrl, formData);
      if (path === "login") {
        router.push("/dashboard");
      } else {
        setIsOpenModal((prev) => !prev);
      }
    } catch (error) {
      //에러 발생시 버튼 포커스 해제
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <FormProvider {...hookForm}>
        <form
          onSubmit={hookForm.handleSubmit(handleRequest)}
          className="mx-4 mt-10 sm:mx-13 md:mx-160"
        >
          {field.map((item) => (
            <Input
              key={item.name}
              label={item.label}
              name={item.name}
              type={item.type}
              placeholder={item.placeholder}
            >
              <Input.Label />
              <Input.Input />
            </Input>
          ))}
          <Button type="submit" className="mt-10">
            {path === "signup" ? "회원가입하기" : "로그인하기"}
          </Button>
          <div className="mt-5 text-center">{message}</div>
        </form>
      </FormProvider>
      {isOpenModal && <Modal />}
    </>
  );
};

export default Form;
