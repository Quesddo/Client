import Link from "next/link";

interface TabSideMenuItemProps {
  content: string;
  goalId: number;
}

export default function TabSideMenuItem({
  content,
  goalId,
}: TabSideMenuItemProps) {
  return (
    <li className="group mr-1 rounded-lg bg-white text-sm font-medium hover:bg-blue-100">
      <Link
        href={`/goal/${goalId}`}
        className="box-border flex w-full items-center justify-between gap-2 p-2"
      >
        <div className="flex items-center gap-2">
          <span>•</span>
          <span className="break-all">
            {content}
            {content}
          </span>
        </div>
      </Link>
    </li>
  );
}
