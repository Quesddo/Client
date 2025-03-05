interface EmptyDataProps {
  type: "todo" | "done" | "goal";
}
export default function EmptyData({ type }: EmptyDataProps) {
  let text;
  switch (type) {
    case "goal":
      text = "등록한 목표가 없어요";
      break;
    case "done":
      text = "아직 할 일이 없어요";
      break;
    case "todo":
      text = "아직 해야할 일이 없어요";
      break;
  }
  return (
    <div className="flex h-full items-center justify-center text-sm font-normal text-slate-500">
      {text}
    </div>
  );
}
