type PlusIconProps = Pick<
  React.SVGProps<SVGSVGElement>,
  "width" | "height" | "color"
>;

export default function PlusIcon({ width, height, color }: PlusIconProps) {
  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
    >
      <path
        d="M5 12H18.5"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
      <path
        d="M11.75 18.75V5.25"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </svg>
  );
}
