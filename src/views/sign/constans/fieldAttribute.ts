import type { LoginRequest, UserCreateRequst } from "@/types/User";
import type { Path } from "react-hook-form";






type Field<T> = {
  name: Path<T>;
  label: string;
  type: string;
  placeholder: string;
  rules?: Record<string, unknown>;
};

export const SIGNUP_ATTRIBUTE: Field<UserCreateRequst>[] = [
  {
    name: "name",
    label: "이름",
    type: "text",
    placeholder: "이름을 입력해주세요",
    rules: { required: true },
  },
  {
    name: "email",
    label: "이메일",
    type: "text",
    placeholder: "이메일을 입력해주세요",
    rules: { required: true },
  },
  {
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력해주세요",
    rules: { required: true },
  },
  {
    name: "confirmPassword",
    label: "비밀번호 확인",
    type: "password",
    placeholder: "비밀번호를 다시 입력해주세요",
    rules: { required: true },
  },
];

export const LOGIN_ATTRIBUTE: Field<LoginRequest>[] = [
  {
    name: "email",
    label: "이메일",
    type: "text",
    placeholder: "이메일을 입력해주세요",
    rules: { required: true },
  },
  {
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력해주세요",
    rules: { required: true },
  },
];
