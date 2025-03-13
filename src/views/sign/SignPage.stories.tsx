import logo from "@public/icons/logo-lg.png";
import type { Meta, StoryFn } from "@storybook/react";
import Image from "next/image";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

import Button from "@/components/atoms/button/Button";
import { SignField } from "@/types/Sign";

import { LOGIN, SIGNUP } from "./fieldSet";
import Input from "./SignInput";

const story: Meta = {
  title: "Pages/sign/page",
  tags: ["autodocs"],
};

interface SignProps {
  field: SignField[];
  page: string;
}

const Template: StoryFn<SignProps> = (args) => {
  const methods = useForm();

  return (
    <div className="mt-12 sm:mt-16 md:mt-30">
      <Image
        className="mx-auto my-0"
        src={logo}
        alt="logo"
        width={270}
        height={89}
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})}>
          {args.field.map((item) => (
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
          <Button
            onClick={(e) => e.currentTarget.blur()}
            className="mt-10"
            type="submit"
          >
            {args.page === "login" ? "로그인하기" : "회원가입하기"}
          </Button>
        </form>
      </FormProvider>
      <p className="mt-10 text-center font-normal">
        {args.page === "login"
          ? "퀘스또가 처음이신가요?"
          : "이미 회원이신가요?"}
        <Link
          className="text-blue-600 underline hover:text-blue-800"
          href={"#"}
        >
          {args.page === "login" ? "로그인하기" : "회원가입하기"}
        </Link>
      </p>
    </div>
  );
};

export const Login = Template.bind({});

Login.args = {
  field: LOGIN,
  page: "login",
};

export const Signup = Template.bind({});
Signup.args = {
  field: SIGNUP,
  page: "signup",
};

export default story;
