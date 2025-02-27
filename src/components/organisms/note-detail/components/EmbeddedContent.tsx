interface EmbeddedContentProps {
  linkUrl?: string;
  isOpen: boolean;
}

export default function EmbeddedContent({
  linkUrl,
  isOpen,
}: EmbeddedContentProps) {
  // link가 존재하면서 open 상태일때만 렌더링
  if (!linkUrl || !isOpen) return;
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="top-0 right-[800px] flex h-fit items-center justify-center bg-blue-50 md:absolute md:h-full md:w-[543px]"
    >
      <iframe
        src={linkUrl}
        className="h-[370px] w-full shrink-0"
        allowFullScreen
      />
    </div>
  );
}
