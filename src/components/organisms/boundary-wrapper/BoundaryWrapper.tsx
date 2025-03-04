import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Skeleton from "@/components/atoms/skeleton/Skeleton";
import ErrorFallback from "@/components/molecules/error-fallback/ErrorFallback";

interface BoundaryWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ({ error }: { error: Error }) => ReactNode;
}

function defaultFallback(): ReactNode {
  return <Skeleton />;
}

function defaultErrorFallback({ error }: { error: Error }) {
  return <ErrorFallback error={error} />;
}

export default function BoundaryWrapper({
  children,
  fallback,
  errorFallback,
}: BoundaryWrapperProps) {
  return (
    <ErrorBoundary FallbackComponent={errorFallback || defaultErrorFallback}>
      <Suspense fallback={fallback || defaultFallback()}>{children}</Suspense>
    </ErrorBoundary>
  );
}
