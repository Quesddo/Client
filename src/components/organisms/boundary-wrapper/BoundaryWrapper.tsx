import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Spinner from "@/components/atoms/spinner/Spinner";
import ErrorFallback from "@/components/molecules/error-fallback/ErrorFallback";

interface BoundaryWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ({ error }: { error: Error }) => ReactNode;
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
      <Suspense fallback={fallback || <Spinner size={80} />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
