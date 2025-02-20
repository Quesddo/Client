import { SignField } from "@/types/Sign";

const LOGIN: SignField[] = [
  {
    label: "이메일",
    name: "email",
    type: "text",
    placeholder: "이메일을 입력해주세요",
    rules: {
      required: "이메일을 입력해주세요",
    },
  },
  {
    label: "비밀번호",
    name: "password",
    type: "password",
    placeholder: "비밀번호를 입력해주세요",
    rules: {
      required: "비밀번호를 입력해주세요",
    },
  },
];

const SIGNUP: SignField[] = [
  {
    label: "이름",
    name: "name",
    type: "text",
    placeholder: "이름을 입력해주세요",
    rules: {
      required: "이름을 입력해주세요",
    },
  },
  {
    label: "이메일",
    name: "email",
    type: "text",
    placeholder: "이메일을 입력해주세요",
    rules: {
      required: "이메일을 입력해주세요",
    },
  },
  {
    label: "비밀번호",
    name: "password",
    type: "password",
    placeholder: "비밀번호를 입력해주세요",
    rules: {
      required: "비밀번호를 입력해주세요",
      minLength: {
        value: 8,
        message: "비밀번호는 8 자 이상 입력해주세요.",
      },
    },
  },
  {
    label: "비밀번호 확인",
    name: "confirmPassword",
    type: "password",
    placeholder: "비밀번호 확인을 입력해주세요",
    rules: {
      required: "비밀번호 확인을 입력해주세요",
      validate: (value, formValues) =>
        value === formValues.password || "비밀번호가 일치하지 않습니다.",
    },
  },
];

export { LOGIN, SIGNUP };
