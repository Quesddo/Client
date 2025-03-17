import Image from "next/image";

interface SpinnerProps {
  size: number;
}

export default function Spinner({ size }: SpinnerProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <Image
        src="/icons/spinner.gif"
        alt="spinner"
        width={size}
        height={size}
      />
    </div>
  );
}
