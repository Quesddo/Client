import Image from "next/image";
import { ReactNode } from "react";

export default function Body({ children }: { children: ReactNode }) {
  return (
    <section>
      <Image
        className="mx-auto my-0"
        src="/img_logo.png"
        alt="logo"
        width={270}
        height={89}
      />
      {children}
    </section>
  );
}
