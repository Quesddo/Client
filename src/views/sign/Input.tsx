import On from "@public/visibility_on.png";
import Image from "next/image";
import React, { createContext, useContext, useState } from "react";
import { useFormContext } from "react-hook-form";
import Off from "@public/visibility_off.png";

export interface InputContextProps {
  name: string;
  type: string;
  label?: string;
  placehoder?: string;
}

const InputContext = createContext<InputContextProps | null>(null);

interface InputComponentProps extends InputContextProps {
  children: React.ReactNode;
}

export const InputComponent = ({
  name,
  type = "text",
  label,
  children,
  placehoder,
}: InputComponentProps) => {
  return (
    <InputContext.Provider value={{ name, type, label, placehoder }}>
      <div className="mt-6 flex flex-col first:mt-0">{children}</div>
    </InputContext.Provider>
  );
};

const Input = () => {
  const { register } = useFormContext();
  const context = useContext(InputContext);

  if (!context) {
    throw new Error("Input must be used within an InputComponent");
  }

  const { name, type, placehoder } = context;
  const [inputType, setInputType] = useState(type);

  return (
    <div className="relative">
      <input
        {...register(name)}
        type={inputType}
        className="box-border h-11 w-full rounded-xl bg-slate-50 px-6 py-3 text-sm font-normal text-slate-400"
        placeholder={placehoder && ""}
      />
      {type === "password" && (
        <InputComponent.TogglePasswordButton setInputType={setInputType} />
      )}
    </div>
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
  setInputType: React.Dispatch<React.SetStateAction<string>>;
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

InputComponent.Input = Input;
InputComponent.Label = Label;
InputComponent.TogglePasswordButton = TogglePasswordButton;

export default InputComponent;
