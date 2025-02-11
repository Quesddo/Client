"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useAxios } from "@/hooks/useAxios";

import InputField from "@/views/sign/components/InputField";
import { LOGIN_ATTRIBUTE } from "@/views/sign/constans/fieldAttribute";
import type { LoginRequest } from "@/types/User";

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginRequest>();
  const { data, handleRequest, error } = useAxios<LoginRequest>({
    url: "/auth/login",
    method: "post",
    initialData: {} as LoginRequest,
    shouldFetchOnMount: false,
  });

  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (formData: LoginRequest) => {
    handleRequest({ body: { ...formData } });
  };

  useEffect(() => {
    if ("accessToken" in data) {
      localStorage.setItem("token", data.accessToken as string);
      router.push("/dashboard");
    } else if (error) {
      setMessage(error);
    }
  }, [data, error, router]);

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        {LOGIN_ATTRIBUTE.map((field) => (
          <InputField<LoginRequest>
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            register={register}
            placeholder={field.placeholder}
          />
        ))}
        <input
          className="mt-10 block h-12 w-full rounded-xl bg-slate-400 text-center text-base font-semibold text-white"
          type="submit"
          value="로그인 하기"
        />
      </form>
      <p className="mt-10 text-center font-normal">
        슬리드 투두가 처음이신가요?{" "}
        <Link
          className="text-blue-600 underline hover:text-blue-800"
          href={"/signup"}
        >
          회원가입
        </Link>
      </p>
      {message && <div>{message}</div>}
    </div>
  );
}
