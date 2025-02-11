"use client";

import Image from "next/image";
import { useState } from "react";

import type {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  label: string;
  type: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>> | undefined;
}

export default function InputField<T extends FieldValues>({
  label,
  type,
  placeholder,
  name,
  register,
  rules,
}: InputFieldProps<T>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <div className="mt-6 first:mt-0">
      <label className="block h-9 w-full text-base font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          className="box-border block h-11 w-full rounded-xl bg-slate-50 px-6 py-3 text-sm font-normal text-slate-400"
          {...register(name, rules)}
          type={inputType}
          placeholder={placeholder}
        />
        {name === "password" || name === "confirmPassword" ? (
          <button
            className="absolute top-1/4 right-[25px]"
            type="button"
            onClick={togglePasswordVisibility}
          >
            <Image
              src={
                isPasswordVisible ? "/visibility_on.png" : "/visibility_off.png"
              }
              alt="eye"
              width={20.47}
              height={18.07}
            />
          </button>
        ) : null}
      </div>
    </div>
  );
}
