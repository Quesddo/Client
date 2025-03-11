import { FormProvider, useForm } from "react-hook-form";

import Button from "@/components/atoms/button/Button";

import Input from "./SignInput";
import type { Meta, StoryFn } from "@storybook/react";

const story: Meta<typeof Input> = {
  component: Input,
  title: "views/sign/Input",
  tags: ["autodocs"],
};

const Template: StoryFn<typeof Input> = (args) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        <Input {...args}>
          <Input.Label />
          <Input.Input />
        </Input>
        <Button
          onClick={(e) => e.currentTarget.blur()}
          className="mt-10"
          type="submit"
        >
          클릭하기
        </Button>
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: "name",
  label: "your name",
  type: "text",
  placeholder: "너의 이름은?",
};

export const Password = Template.bind({});
Password.args = {
  name: "password",
  label: "비밀번호",
  type: "password",
  placeholder: "입력하면 해킹 당할 수도?!",
  rules: {
    required: "입력필수",
    minLength: {
      value: 8,
      message: "8자 이상 입력해주세요",
    },
  },
};

export default story;
