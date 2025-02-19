import Image from "next/image";
import Link from "next/link";

import Button from "@/components/atoms/button/Button";
import { useSignUp } from "@/hooks/auth/useSign";
import { SIGNUP } from "@/views/sign/fieldSet";
import Form from "@/views/sign/Form";
import logo from "@public/img_logo.png";

export default function Signup() {
  const signup = useSignUp();

  return (
    <div className="mt-12 sm:mt-16 md:mt-30">
      <Image
        className="mx-auto my-0"
        src={logo}
        alt="logo"
        width={270}
        height={89}
      />
      <Form hooks={signup} field={SIGNUP}>
        <Button
          onClick={(e) => e.currentTarget.blur()}
          type="submit"
          className="mt-10"
        >
          회원가입하기
        </Button>
      </Form>
      <p className="mt-10 text-center font-normal">
        이미 회원이신가요?
        <Link
          className="text-blue-600 underline hover:text-blue-800"
          href={"/login"}
        >
          로그인
        </Link>
      </p>
    </div>
  );
}
