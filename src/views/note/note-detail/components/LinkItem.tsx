import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface LinkItemProps {
  setIsEmbedOpen: Dispatch<SetStateAction<boolean>>;
  linkUrl?: string | null;
}

export default function LinkItem({ linkUrl, setIsEmbedOpen }: LinkItemProps) {
  const toggleEmbed = () => {
    setIsEmbedOpen((isOpen) => !isOpen);
  };

  if (!linkUrl) return;
  return (
    <div
      onClick={toggleEmbed}
      className="flex cursor-pointer items-center gap-2 rounded-[20px] bg-slate-200 px-[6px] py-1 hover:brightness-95"
    >
      <Image
        src={"/icons/embed.png"}
        alt="embed-icon"
        width={24}
        height={24}
        layout="fixed"
      />
      <span className="text-base font-normal break-all text-slate-800">
        {linkUrl}
      </span>
    </div>
  );
}
