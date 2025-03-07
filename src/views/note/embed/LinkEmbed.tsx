import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface LinkEmbedProps {
  link?: string;
}

const checkEmbedContent = async (link: string) => {
  try {
    const res = await fetch(
      `/api/check-iframe?url=${encodeURIComponent(link)}}`,
    );
    const data = await res.json();

    return data.canEmbed;
  } catch (_) {
    throw new Error("iframe 임베딩 정책 확인 중 오류가 발생했습니다");
  }
};

export default function LinkEmbed({ link }: LinkEmbedProps) {
  const [canEmbed, setCanEmbed] = useState<boolean | null>(null);

  useEffect(() => {
    if (!link) {
      return;
    }

    checkEmbedContent(link).then((res) => setCanEmbed(res));
  }, [link]);

  if (!canEmbed) {
    return;
  }

  return createPortal(
    <div className="w-full bg-white px-6 pb-6">
      <iframe
        src={link}
        className="h-[370px] w-full shrink-0 sm:h-[522px]"
        allowFullScreen
      />
    </div>,
    document.querySelector("#embed-container") as HTMLElement,
  );
}
