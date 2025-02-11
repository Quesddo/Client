import Image, { ImageProps } from "next/image";

interface MenuItemProps {
  title: string;
  icon: ImageProps["src"];
}

export default function MenuItem({ title, icon }: MenuItemProps) {
  return (
    <div className="flex items-center gap-2">
      <Image src={icon} width={24} height={24} alt={title} />
      <span className="text-lg font-medium">{title}</span>
    </div>
  );
}
