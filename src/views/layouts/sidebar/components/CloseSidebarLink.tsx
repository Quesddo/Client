import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, useContext } from "react";

import { SidebarContext } from "../Sidebar";

export default function CloseSidebarLink({
  href,
  children,
  ...props
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const handleCloseSidebar = useContext(SidebarContext);

  return (
    <Link href={href} {...props} onClick={handleCloseSidebar}>
      {children}
    </Link>
  );
}
