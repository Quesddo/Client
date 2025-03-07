import { useFormContext } from "react-hook-form";

export default function LinkDisplay() {
  const { watch, setValue } = useFormContext();

  const linkUrl = watch("linkUrl");

  const handleRemoveLink = () => {
    setValue("linkUrl", "");
  };

  return (
    linkUrl && (
      <div className="flex items-center justify-between gap-2 rounded-[20px] bg-slate-200 px-1.5 py-1 text-base font-normal">
        <div className="flex items-center gap-2">
          <img src="/icons/embed.png" alt="임베드" width={24} height={24} />
          <p className="break-all">{linkUrl}</p>
        </div>
        <button type="button" className="shrink-0" onClick={handleRemoveLink}>
          <img
            src="/icons/delete-circle-gray.png"
            alt="삭제"
            width={24}
            height={24}
          />
        </button>
      </div>
    )
  );
}
