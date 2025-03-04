import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Skeleton from "@/components/atoms/skeleton/Skeleton";
import ErrorFallback from "@/components/molecules/error-fallback/ErrorFallback";

interface BoundaryWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ({ error }: { error: Error }) => ReactNode;
}

function DefaultFallback(): ReactNode {
  return <Skeleton />;
}

function DefaultErrorFallback({ error }: { error: Error }) {
  return <ErrorFallback error={error} />;
}

export default function BoundaryWrapper({
  children,
  fallback,
  errorFallback,
}: BoundaryWrapperProps) {
  return (
    <ErrorBoundary FallbackComponent={errorFallback || DefaultErrorFallback}>
      <Suspense fallback={fallback || DefaultFallback()}>{children}</Suspense>
    </ErrorBoundary>
  );
}
