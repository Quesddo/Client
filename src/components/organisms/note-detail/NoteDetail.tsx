import { useRouter } from "next/router";
import { Suspense } from "react";

import ExitBtn from "@/components/atoms/exit-btn/ExitBtn";
import Spinner from "@/components/atoms/spinner/Spinner";

import NoteDetailContent from "./components/NoteDetailContent";

export default function NoteDetail() {
  const router = useRouter();
  const { noteId } = router.query;

  const handleCloseSidebar = () => {
    router.push(router.pathname, undefined, { shallow: true });
  };

  // noteId가 없는 경우 렌더링하지 않음
  if (!noteId) return;
  return (
    // 사이드바의 바깥쪽을 누르면 쿼리스트링이 사라지도록 함 => 사이드바가 닫힘
    <div
      onClick={handleCloseSidebar}
      className="fixed inset-0 z-50 flex justify-end bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="box-border flex h-full w-full flex-col gap-4 border-l border-slate-200 bg-white p-4 break-words whitespace-pre-wrap sm:w-[512px] md:w-[800px] md:p-6"
      >
        <ExitBtn onClick={handleCloseSidebar} />

        {/* 내부 콘텐츠 부분만 Suspense로 감싸기 */}
        <Suspense fallback={<Spinner size={80} />}>
          <NoteDetailContent noteId={Number(noteId)} />
        </Suspense>
      </div>
    </div>
  );
}
