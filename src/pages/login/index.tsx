import Image from "next/image";
import Link from "next/link";

import pageRoutes from "@/router/pageRoutes";
import Main from "@/views/sign/Main";
import SignForm from "@/views/sign/SignForm";
import logo from "@public/icons/logo-lg.png";

import QuesddoHead from "../../components/atoms/quesddo-head/QuesddoHead";

export default function LoginPage() {
  return (
    <>
      <QuesddoHead title="로그인" />

      <Main>
        <Image
          className="mx-auto my-0"
          src={logo}
          alt="logo"
          width={270}
          height={89}
        />
        <SignForm>
          <SignForm.InnerForm />
        </SignForm>
        <p className="mt-10 text-center font-normal">
          퀘스또가 처음이신가요?
          <Link
            className="ml-1 inline-block text-blue-600 underline hover:text-blue-800"
            href={pageRoutes.signup()}
          >
            회원가입
          </Link>
        </p>
      </Main>
    </>
  );
}
