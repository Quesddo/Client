export default function Toast() {
  return (
    <div className="flex items-center gap-2 rounded-[28px] bg-blue-50 px-6 py-3 text-sm font-semibold text-blue-500">
      <img src="/icons/check.png" alt="확인" width={24} height={24} />
      <p>
        임시 저장이 완료되었습니다{" "}
        <span className="text-xs font-medium">ㆍ 1초전</span>
      </p>
    </div>
  );
}
