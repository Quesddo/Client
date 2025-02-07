import Image from "next/image";

interface IconProps {
  iconName: string; // 아이콘 파일명 (파일 확장자 제외, 확장자는 png로 고정)
  width: number;
  height: number;
  className?: string;
  alt?: string; // alt을 명시해주지 않으면 iconName이 default로 들어갑니다.
}

const Icon = ({
  iconName,
  width,
  height,
  className = "",
  alt = "",
}: IconProps) => {
  const iconPath = `/icons/${iconName}.png`;
  return (
    <Image
      src={iconPath}
      alt={alt || iconName}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Icon;
