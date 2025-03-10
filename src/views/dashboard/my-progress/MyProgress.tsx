import Image from "next/image";
import progressImg from "@public/icons/progress.png";

import Gauge from "./components/Gauge";

export default function MyProgress() {
  return (
    <section className="flex h-[250px] flex-1 rounded-xl bg-blue-500 text-white transition-shadow duration-300 hover:shadow-2xl">
      <div className="flex-1 pt-[16px] pl-[24px]">
        <Image src={progressImg} width={40} height={40} alt="progress" />
        <p className="mt-[16px] font-normal">내 진행 상황</p>
      </div>
      <Gauge />
    </section>
  );
}
