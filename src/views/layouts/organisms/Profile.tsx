import Image from "next/image";
import { memo } from "react";

import { useFetchUser } from "@/hooks/user/useFetchUser";
import profile from "@public/icons/profile.png";

export default memo(function Profile() {
  const { data, isError, error } = useFetchUser();

  return (
    <section className="flex items-center gap-2 pt-4 pb-6 sm:gap-3">
      <div className="relative h-[32px] w-[32px] sm:h-[64px] sm:w-[64px]">
        <Image src={profile} alt="프로필" fill />
      </div>
      <div className="flex flex-1 items-end justify-between sm:flex-col sm:items-start sm:gap-2">
        {isError && <p>에러 발생: {(error as Error).message}</p>}
        {data && (
          <>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-800 sm:text-sm">
                {data.name}
              </span>
              <span className="text-xs font-medium text-slate-600 sm:text-sm">
                {data.email}
              </span>
            </div>
            <button className="text-xs font-medium text-slate-400">
              로그아웃
            </button>
          </>
        )}
      </div>
    </section>
  );
});
