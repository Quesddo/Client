import Button from "@/components/atoms/button/Button";
import Input from "@/components/atoms/input/Input";

import Toast from "./Toast";

export default function Editor() {
  return (
    <div>
      <p className="pt-[12px] text-xs font-medium text-slate-800">
        공백포함 : 총 0자 | 공백제외 : 총 0자
      </p>
      <textarea name="content" id=""></textarea>
      <Toast />
      <div>
        <Button>link추가</Button>
        <Input type="text" name="linkUrl" />
      </div>
    </div>
  );
}
