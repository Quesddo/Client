import { ImgHTMLAttributes, memo } from "react";

interface MenuItemProps {
  title: string;
  iconSrc: ImgHTMLAttributes<HTMLImageElement>["src"];
}

export default memo(function MenuItem({ title, iconSrc }: MenuItemProps) {
  return (
    <div className="flex items-center gap-2">
      <img src={iconSrc} width={24} height={24} alt={title} />
      <span className="text-lg font-medium">{title}</span>
    </div>
  );
});
