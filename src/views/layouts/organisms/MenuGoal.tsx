import { memo } from "react";
import flag from "@public/icons/flag.png";

import MenuItem from "../atoms/MenuItem";
import TabSideMenuList from "../molecules/TabSideMenuList";

const items = ["hihihihi"];

export default memo(function MenuGoal() {
  return (
    <section className="flex min-h-0 flex-1 flex-col gap-3 pt-3">
      <div className="flex justify-between">
        <MenuItem title="목표" icon={flag} />
        <button className="sm:hidden">새 목표</button>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-6">
        <TabSideMenuList items={items} />
        <button className="h-[44px]">새 목표</button>
      </div>
    </section>
  );
});
