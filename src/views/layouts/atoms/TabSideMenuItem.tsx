interface TabSideMenuItemProps {
  content: string;
}

export default function TabSideMenuItem({ content }: TabSideMenuItemProps) {
  return (
    <li className="rounded-lg bg-white p-2 text-sm font-medium">• {content}</li>
  );
}
