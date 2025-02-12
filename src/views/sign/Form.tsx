import axios from "axios";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";

import signAxios from "@/apis/sign/";
import type { LoginRequest, UserCreateRequst } from "@/types/User";

import { fieldSet } from "./fieldSet";
import type { Path } from "./index";
import Input from "./Input";

const Form = ({ path }: { path: Path }) => {
  const hookForm = useForm();
  const field = fieldSet[path];
  const apiUrl = path === "signup" ? "/user" : "/auth/login";

  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (
    formData: FieldValues | UserCreateRequst | LoginRequest,
  ) => {
    try {
      const res = await signAxios.post(apiUrl, formData);
      if (path === "login") {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data.message);
      }
    }
  };

  return (
    <FormProvider {...hookForm}>
      <form
        onSubmit={hookForm.handleSubmit(onSubmit)}
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
        <input
          type="submit"
          className="mt-10 block h-12 w-full rounded-xl bg-slate-400 text-center text-base font-semibold text-white"
          value={path === "signup" ? "회원가입하기" : "로그인하기"}
        />
        <div className="mt-5 text-center">{message}</div>
      </form>
    </FormProvider>
  );
};

export default Form;
