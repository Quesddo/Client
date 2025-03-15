import Button from "@/components/atoms/button/Button";
import { useCanEmbed } from "@/hooks/note/useCanEmbed";
import { cn } from "@/utils/cn/cn";

interface EmbeddedContentProps {
  linkUrl?: string | null;
  isOpen: boolean;
}

export default function EmbeddedContent({
  linkUrl,
  isOpen,
}: EmbeddedContentProps) {
  const { canEmbed } = useCanEmbed(linkUrl);

  // 첨부된 외부 링크 여는 함수
  const handleOpenLink = () => {
    if (linkUrl) {
      window.open(linkUrl, "_blank");
    }
  };

  // link가 존재하면서 open 상태일때만 렌더링
  if (!linkUrl || !isOpen) return;
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={cn(
        `top-0 right-[800px] flex h-[370px] shrink-0 flex-col items-center justify-center bg-blue-50 md:absolute md:h-full md:w-[543px] ${!canEmbed && "h-[200px]"}`,
      )}
    >
      {canEmbed ? (
        <iframe
          src={linkUrl}
          className="h-[370px] w-full shrink-0"
          allowFullScreen
        />
      ) : (
        <>
          {/*  임베드 안 되는 경우 링크 이동 버튼 */}
          <span className="mb-4 text-xl font-semibold text-slate-900">
            미리보기가 거부된 사이트입니다
          </span>
          <Button onClick={handleOpenLink} rounded className="w-60">
            링크로 이동하기
          </Button>
        </>
      )}
    </div>
  );
}
