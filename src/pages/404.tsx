import { useRouter } from "next/router";

import Button from "@/components/atoms/button/Button";

export default function Custom404() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-slate-100 text-2xl font-normal">
      <img src="/icons/profile.png" width={50} alt="profile.png" />
      <h1>잘못된 접근입니다</h1>
      <Button onClick={handleClick} size={"lg"} rounded>
        메인으로 가기
      </Button>
    </div>
  );
}
