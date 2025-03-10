import On from "@public/visibility_on.png";
import Image from "next/image";
import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";

import Input from "@/components/atoms/input/Input";
import { SignField } from "@/types/Sign";
import Off from "@public/visibility_off.png";

interface SignInputContextProps extends SignField {
  children: ReactNode;
}

const SignInputContext = createContext<SignInputContextProps | null>(null);

const SignInput = ({
  name,
  type,
  label,
  children,
  placeholder,
  rules,
}: SignInputContextProps) => {
  const values = {
    name,
    type,
    label,
    children,
    placeholder,
    rules,
  };

  return (
    <SignInputContext.Provider value={values}>
      <div className="mt-6 flex flex-col first:mt-0">{children}</div>
    </SignInputContext.Provider>
  );
};

const InputWrapper = () => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();
  const context = useContext(SignInputContext);
  if (!context) {
    throw new Error("Input must be used within an InputComponent");
  }

  const timeoutRef = useRef<number | null>(null);

  const { name, type, placeholder, rules } = context;
  const [inputType, setInputType] = useState(type);

  const handleFocus = async () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(async () => {
      await trigger(name);
    }, 1000);
  };

  return (
    <>
      <div className="relative">
        <Input
          {...register(name, rules)}
          type={inputType}
          placeholder={placeholder}
          id={name}
          className={!!errors[name] ? "focus:border-red-700" : ""}
          onFocus={handleFocus}
        />
        {type === "password" && (
          <SignInput.TogglePasswordButton setInputType={setInputType} />
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
  const context = useContext(SignInputContext);
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

SignInput.Input = InputWrapper;
SignInput.Label = Label;
SignInput.TogglePasswordButton = TogglePasswordButton;

export default SignInput;
