import arrowRight from "@public/icons/arrow-right.svg";
import note from "@public/icons/note.svg";
import Image from "next/image";
import Link from "next/link";

import pageRoutes from "@/router/pageRoutes";
import { useGoalDetailContext } from "@/views/goal/GoalDetailContext";

import Section from "../component/Section";

export default function GoalNote() {
  const { goalId } = useGoalDetailContext();

  return (
    <Section className="bg-blue-100 hover:shadow">
      <Link href={pageRoutes.notes(goalId)}>
        <div className="flex justify-between">
          <div className="flex gap-[8px]">
            <Image
              src={note}
              width={24}
              height={24}
              alt="note"
              className="inline-block"
            />
            <span className="text-lg font-bold text-slate-800">
              노트 모아보기
            </span>
          </div>
          <Image src={arrowRight} alt="arrow-right" />
        </div>
      </Link>
    </Section>
  );
}
