import { useRouter } from "next/router";
import { ReactNode, Suspense, useEffect } from "react";

import { useAuth } from "@/hooks/auth/useAuth";

import Spinner from "./atoms/spinner/Spinner";

interface AuthGuardProps {
  children: ReactNode;
}

function SpinnerFallback() {
  return (
    <div className="h-screen">
      <Spinner size={100} />
    </div>
  );
}

const PUBLIC_PATH = ["/", "/login", "/signup"];

function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const isPublicPage = PUBLIC_PATH.includes(router.pathname);

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated === isPublicPage) {
      if (isAuthenticated) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [isAuthenticated, router, isPublicPage, isLoading]);

  if (isLoading) return;

  if (isAuthenticated === isPublicPage) {
    return null;
  }

  return <>{children}</>;
}

export default function AuthLayer(props: AuthGuardProps) {
  return (
    <Suspense fallback={<SpinnerFallback />}>
      <AuthGuard {...props} />
    </Suspense>
  );
}
