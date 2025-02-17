import { TeamIdGoalsGet200Response } from "@/types/types";

import TabSideMenuItem from "../atoms/TabSideMenuItem";

interface TabSideMenuItemProps {
  items: TeamIdGoalsGet200Response["goals"];
}

export default function TabSideMenuList({ items }: TabSideMenuItemProps) {
  return (
    <ul className="flex-1 overflow-auto">
      {items.map((item) => (
        <TabSideMenuItem key={item.id} content={item.title} />
      ))}
    </ul>
  );
}
