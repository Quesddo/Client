import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Path } from "@/types/auth";
import Form from "@/views/sign/Form";
import logo from "@public/img_logo.png";

export default function Body() {
  const pathname = usePathname();
  const path = pathname.slice(1) as Path;

  return (
    <div className="mt-12 sm:mt-16 md:mt-30">
      <Image
        className="mx-auto my-0"
        src={logo}
        alt="logo"
        width={270}
        height={89}
      />
      <Form path={path} />
      {path === "login" ? (
        <p className="mt-10 text-center font-normal">
          슬리드 투두가 처음이신가요?{" "}
          <Link
            className="text-blue-600 underline hover:text-blue-800"
            href={"/signup"}
          >
            회원가입
          </Link>
        </p>
      ) : (
        <p className="mt-10 text-center font-normal">
          이미 회원이신가요?
          <Link
            className="text-blue-600 underline hover:text-blue-800"
            href={"/login"}
          >
            로그인
          </Link>
        </p>
      )}
    </div>
  );
}
