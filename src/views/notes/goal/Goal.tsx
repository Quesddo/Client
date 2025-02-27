import GoalItem from "@/components/atoms/goal-item/GoalItem";

interface GoalProps {
  goal?: string;
}

export default function Goal({ goal }: GoalProps) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-6 py-[14px]">
      <GoalItem
        fontWeight={"semibold"}
        iconSize="sm"
        textSize="sm"
        goal={goal}
      />
    </div>
  );
}
