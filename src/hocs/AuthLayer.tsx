import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

import { useFetchUser } from "@/hooks/user/useFetchUser";

interface AuthGuardProps {
  children: ReactNode;
}

const PUBLIC_PATH = ["/login", "/signup"];

function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useFetchUser();
  const isPublicPage = PUBLIC_PATH.includes(router.pathname);

  useEffect(() => {
    if (isLoading) return;
    const redirectTo = isAuthenticated ? "/dashboard" : "/login";
    if (router.pathname === "/" || isAuthenticated === isPublicPage) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, router, isPublicPage, isLoading]);

  if (isLoading) return;

  if (isAuthenticated === isPublicPage) {
    return null;
  }

  return <>{children}</>;
}

export default function AuthLayer(props: AuthGuardProps) {
  return <AuthGuard {...props} />;
}
