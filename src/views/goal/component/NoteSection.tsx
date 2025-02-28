import note from "@public/icons/note.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import arrowRight from "@public/icons/ic_arrow_right.svg";

interface NotePreviewProsp {
  goalId: number;
}

export default function NoteSection({ goalId }: NotePreviewProsp) {
  const path = `/goal/${goalId}/notes`;
  const [hasNotes, setHasNotes] = useState(true);

  useEffect(() => {
    fetch(path).then((res) => setHasNotes(res.ok));
  }, [path]);

  const handleClick = () => {
    if (!hasNotes) {
      alert("노트가 없습니다.");
    }
  };

  return (
    <Link href={hasNotes ? path : "#"} onClick={handleClick}>
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
  );
}
