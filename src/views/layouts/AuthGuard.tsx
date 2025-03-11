import { useRouter } from "next/router";
import { ReactNode } from "react";

import { useFetchUser } from "@/hooks/user/useFetchUser";

interface AuthGuardProps {
  children: ReactNode;
}

const PUBLIC_PATH = ["/login", "/signup"];

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useFetchUser();
  const isPublicPage = PUBLIC_PATH.includes(router.pathname);

  if (isLoading) return null;

  const redirectTo = isAuthenticated ? "/dashboard" : "/login";

  if (router.pathname === "/" || isAuthenticated === isPublicPage) {
    return router.replace(redirectTo);
  }

  return <>{children}</>;
}
