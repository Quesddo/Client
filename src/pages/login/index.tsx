import Image from "next/image";
import Link from "next/link";

import Form from "@/views/sign/Form";
import logo from "@public/img_logo.png";

export default function Login() {
  return (
    <div className="mt-12 sm:mt-16 md:mt-30">
      <Image
        className="mx-auto my-0"
        src={logo}
        alt="logo"
        width={270}
        height={89}
      />
      <Form>
        <Form.InnerForm />
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
