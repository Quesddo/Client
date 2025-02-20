import On from "@public/visibility_on.png";
import Image from "next/image";
import React, { createContext, useContext, useState } from "react";
import { useFormContext } from "react-hook-form";

import Input from "@/components/atoms/input/Input";
import { SignField } from "@/types/Sign";
import Off from "@public/visibility_off.png";

interface InputField extends SignField {
  disabled?: boolean;
}

interface InputComponentProps extends SignField {
  children: React.ReactNode;
  disabled?: boolean;
}

const InputContext = createContext<InputField | null>(null);

export const InputComponent = ({
  name,
  type,
  label,
  children,
  placeholder,
  rules,
  disabled,
}: InputComponentProps) => {
  return (
    <InputContext.Provider
      value={{ name, type, label, placeholder, rules, disabled }}
    >
      <div className="mt-6 flex flex-col first:mt-0">{children}</div>
    </InputContext.Provider>
  );
};

const InputContainer = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const context = useContext(InputContext);

  if (!context) {
    throw new Error("Input must be used within an InputComponent");
  }

  const { name, type, placeholder, rules } = context;
  const [inputType, setInputType] = useState(type);
  return (
    <>
      <div className="relative">
        <Input
          {...register(name, rules)}
          type={inputType}
          placeholder={placeholder}
          id={name}
          className={!!errors[name] ? "focus:border-red-700" : ""}
        />
        {type === "password" && (
          <InputComponent.TogglePasswordButton setInputType={setInputType} />
        )}
      </div>
      {errors[name] && (
        <p className="mt-[8px] ml-[16px] text-sm font-normal text-red-700">
          {errors[name]?.message as string}
        </p>
      )}
    </>
  );
};

const Label = () => {
  const context = useContext(InputContext);
  if (!context) return null;
  const { name, label } = context;

  return label ? (
    <label htmlFor={name} className="block h-9 w-full text-base font-semibold">
      {label}
    </label>
  ) : null;
};

const TogglePasswordButton = ({
  setInputType,
}: {
  setInputType: React.Dispatch<React.SetStateAction<HTMLInputElement["type"]>>;
}) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <button
      type="button"
      onClick={toggleVisibility}
      className="absolute top-1/2 right-[25px] -translate-y-1/2 transform"
    >
      <Image src={visible ? On : Off} alt="eye" width={20.47} height={18.07} />
    </button>
  );
};

InputComponent.Input = InputContainer;
InputComponent.Label = Label;
InputComponent.TogglePasswordButton = TogglePasswordButton;

export default InputComponent;
