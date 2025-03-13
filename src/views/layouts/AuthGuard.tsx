import { useRouter } from "next/router";
import { ReactNode } from "react";

import { useFetchUser } from "@/hooks/user/useFetchUser";
import routes from "@/router/routes";

interface AuthGuardProps {
  children: ReactNode;
}

const PUBLIC_PATH = [routes.login(), routes.signup()];

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useFetchUser();
  const isPublicPage = PUBLIC_PATH.includes(router.pathname);

  if (isLoading) return null;

  const redirectTo = isAuthenticated ? routes.dashboard() : routes.login();

  if (router.pathname === routes.root() || isAuthenticated === isPublicPage) {
    return router.replace(redirectTo);
  }

  return <>{children}</>;
}
