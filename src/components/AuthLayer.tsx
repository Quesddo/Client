import { useRouter } from "next/router";
import { ReactNode, Suspense, useEffect } from "react";

import { useFetchUser } from "@/hooks/user/useFetchUser";

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
  return (
    <Suspense fallback={<SpinnerFallback />}>
      <AuthGuard {...props} />
    </Suspense>
  );
}
