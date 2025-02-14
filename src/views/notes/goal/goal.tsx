import Image from "next/image";

export default function Goal() {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-6 py-[14px]">
      <Image
        src="/icons/flag-goal.png"
        alt="flag-goal"
        height={24}
        width={24}
      />
      <span className="text-sm font-semibold text-slate-800">
        자바스크립트로 웹 서비스 만들기
      </span>
    </div>
  );
}
