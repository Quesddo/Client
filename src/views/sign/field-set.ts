const LOGIN = [
  {
    label: "이메일",
    name: "email",
    type: "text",
    placeholder: "이메일을 입력해주세요",
  },
  {
    label: "비밀번호",
    name: "password",
    type: "password",
    placeholder: "비밀번호를 입력해주세요",
  },
];

const FIELD_SET = {
  signup: [
    {
      label: "이름",
      name: "name",
      type: "text",
      placeholder: "이름을 입력해주세요",
    },
    ...LOGIN,
    {
      label: "비밀번호 확인",
      name: "confirmPassword",
      type: "password",
      placeholder: "비밀번호 확인을 입력해주세요",
    },
  ],
  login: LOGIN,
};
export default FIELD_SET;
