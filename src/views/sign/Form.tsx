import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { UserCreateRequstDto } from "@/types/types";

import Input from "./Input";

interface InputAttribute {
  name: string;
  type: string;
  label: string;
  placeholder: string;
}

interface FormData extends UserCreateRequstDto {
  confirmPassword: string;
}

interface FormProps<T extends FormData> {
  children: ReactNode;
  field: InputAttribute[];
  onSubmit: (data: T) => void;
}

const Form = <T extends FormData>({
  children,
  field,
  onSubmit,
}: FormProps<T>) => {
  const hookForm = useForm<T>();
  const handleRequest = async (formData: T) => {
    onSubmit(formData);
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
          {children}
        </form>
      </FormProvider>
    </>
  );
};

export default Form;
