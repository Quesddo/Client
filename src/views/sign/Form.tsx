import { FormProvider, useForm } from "react-hook-form";

import { fieldSet } from "./fieldSet";

import Input from "./Input";
import type { Path } from "./index";

const Form = ({ path }: { path: Path }) => {
  const hookForm = useForm();
  const field = fieldSet[path];

  return (
    <FormProvider {...hookForm}>
      <form
        onSubmit={hookForm.handleSubmit((data) => console.log(data))}
        className="mx-4 mt-10 sm:mx-13 md:mx-160"
      >
        {field.map((item) => (
          <Input
            key={item.name}
            label={item.label}
            name={item.name}
            type={item.type}
            placehoder={item.placehoder}
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
      </form>
    </FormProvider>
  );
};

export default Form;
