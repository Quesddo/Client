import Button from "@/components/atoms/button/Button";

export default function ToastBtn() {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[28px] bg-blue-50 px-3 py-2.5 text-blue-500">
      <div className="flex gap-4">
        <img src="/icons/delete.png" alt="삭제" width={24} height={24} />
        <p>임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?</p>
      </div>
      <Button variant="outline" size="xs" rounded>
        불러오기
      </Button>
    </div>
  );
}
