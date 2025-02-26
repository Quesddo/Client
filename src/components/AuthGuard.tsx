import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

import { useAuth } from "@/hooks/auth/useAuth";

interface AuthGuardProps {
  children: ReactNode;
}

const PUBLICPATH = ["/login", "/signup"];

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const isPublicPage = PUBLICPATH.includes(router.pathname);

  useEffect(() => {
    if (isLoading) return;

    if (router.pathname === "/") {
      if (isAuthenticated) router.replace("/dashboard");
      else router.replace("/login");
      return;
    }

    if (!isAuthenticated && !isPublicPage) {
      router.replace("/login");
    } else if (isAuthenticated && isPublicPage) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router, isPublicPage, isLoading]);

  if (isLoading) return <div>페이지 이동 중...</div>;

  if (isAuthenticated && isPublicPage) return null;

  if (isAuthenticated || isPublicPage) return <>{children}</>;
}
