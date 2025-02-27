import TabSideMenuItem from "./TabSideMenuItem";

interface TabSideMenuItemProps {
  items: string[];
}

export default function TabSideMenuList({ items }: TabSideMenuItemProps) {
  return (
    <ul className="flex-1 overflow-auto">
      {items.map((item, i) => (
        <TabSideMenuItem key={i} content={item} />
      ))}
    </ul>
  );
}
