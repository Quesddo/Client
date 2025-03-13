import { useRouter } from "next/router";
import { ReactNode } from "react";

import { useFetchUser } from "@/hooks/user/useFetchUser";
import pageRoutes from "@/router/pageRoutes";

interface AuthGuardProps {
  children: ReactNode;
}

const PUBLIC_PATH = [pageRoutes.login(), pageRoutes.signup()];

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useFetchUser();
  const isPublicPage = PUBLIC_PATH.includes(router.pathname);

  if (isLoading) return null;

  const redirectTo = isAuthenticated
    ? pageRoutes.dashboard()
    : pageRoutes.login();

  if (
    router.pathname === pageRoutes.root() ||
    isAuthenticated === isPublicPage
  ) {
    return router.replace(redirectTo);
  }

  return <>{children}</>;
}
