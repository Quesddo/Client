import TabSideMenuItem from "./TabSideMenuItem";
import { memo } from "react";

import { TeamIdGoalsGet200Response } from "@/types/types";

interface TabSideMenuItemProps {
  items: TeamIdGoalsGet200Response["goals"];
}

export default memo(function TabSideMenuList({ items }: TabSideMenuItemProps) {
  return (
    <ul className="flex-1 overflow-auto">
      {items.map((item) => (
        <TabSideMenuItem key={item.id} content={item.title} />
      ))}
    </ul>
  );
});
