"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useAxios } from "@/hooks/useAxios";

import InputField from "@/views/sign/components/InputField";
import { SIGNUP_ATTRIBUTE } from "@/views/sign/constans/fieldAttribute";
import type { UserCreateRequst } from "@/types/User";

function SignUpForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<UserCreateRequst>();
  const { data, handleRequest, error } = useAxios<UserCreateRequst>({
    url: "/user",
    method: "post",
    initialData: {} as UserCreateRequst,
    shouldFetchOnMount: false,
  });

  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (formData: UserCreateRequst) => {
    if (formData.password !== formData.confirmPassword) {
      setMessage("두 비밀번호가 맞지 않습니다");
    } else {
      handleRequest({ body: { ...formData } });
    }
  };

  useEffect(() => {
    if ("id" in data) {
      setMessage("회원가입 완료");
      router.push("/login");
    } else if (error) {
      setMessage(error);
    }
  }, [data, error, router]);

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        {SIGNUP_ATTRIBUTE.map((field) => (
          <InputField<UserCreateRequst>
            key={field.name}
            name={field.name}
            label={field.label}
            register={register}
            type={field.type}
            rules={field.rules}
            placeholder={field.placeholder}
          />
        ))}
        <input
          className="mt-10 block h-12 w-full rounded-xl bg-slate-400 text-center text-base font-semibold text-white"
          type="submit"
          value="회원 가입하기"
        />
      </form>
      <p className="mt-10 text-center font-normal">
        이미 회원이신가요?
        <Link
          className="text-blue-600 underline hover:text-blue-800"
          href={"/login"}
        >
          로그인
        </Link>
      </p>
      {message && <div>{message}</div>}
    </div>
  );
}

export default SignUpForm;
