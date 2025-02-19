import Image from "next/image";
import Link from "next/link";

import Button from "@/components/atoms/button/Button";
import { useLogin } from "@/hooks/auth/useSign";
import { LOGIN } from "@/views/sign/fieldSet";
import Form from "@/views/sign/Form";
import logo from "@public/img_logo.png";

export default function Login() {
  const login = useLogin();

  return (
    <div className="mt-12 sm:mt-16 md:mt-30">
      <Image
        className="mx-auto my-0"
        src={logo}
        alt="logo"
        width={270}
        height={89}
      />
      <Form hooks={login} field={LOGIN}>
        <Button
          onClick={(e) => e.currentTarget.blur()}
          type="submit"
          className="mt-10"
        >
          로그인하기
        </Button>
      </Form>
      <p className="mt-10 text-center font-normal">
        슬리드 투두가 처음이신가요?
        <Link
          className="text-blue-600 underline hover:text-blue-800"
          href={"/signup"}
        >
          회원가입
        </Link>
      </p>
    </div>
  );
}
