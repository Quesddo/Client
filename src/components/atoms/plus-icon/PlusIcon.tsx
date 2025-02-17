type PlusIconProps = Pick<
  React.SVGProps<SVGSVGElement>,
  "width" | "height" | "color" | "className"
>;

export default function PlusIcon({
  width,
  height,
  color,
  className,
}: PlusIconProps) {
  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      className={className}
    >
      <path
        d="M5 12H18.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M11.75 18.75V5.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
