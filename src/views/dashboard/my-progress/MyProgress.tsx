import Image from "next/image";
import progressImg from "@public/icons/progress.png";

import Gauge from "./components/Gauge";

export default function MyProgress() {
  return (
    <section className="flex h-[218px] flex-1 rounded-xl bg-blue-500 p-4 text-white transition-shadow duration-300 hover:shadow-2xl sm:px-6">
      <div className="flex-1">
        <Image src={progressImg} width={40} height={40} alt="progress" />
        <p className="mt-[16px] text-2xl font-semibold">내 진행 상황</p>
      </div>
      <Gauge />
    </section>
  );
}
