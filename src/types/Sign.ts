import { type RegisterOptions } from "react-hook-form";

type InputType = HTMLInputElement["type"];

export interface SignField {
  name: string;
  type: InputType;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions;
}
