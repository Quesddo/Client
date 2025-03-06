import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <main className="mx-auto mt-12 max-w-[640px] sm:mt-16 md:mt-30">
      {children}
    </main>
  );
}
