import { useErrorBoundary } from "react-error-boundary";

import Button from "@/components/atoms/button/Button";

interface ErrorFallbackProps {
  error: Error;
}

export default function ErrorFallback({ error }: ErrorFallbackProps) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <section className="p-2">
      <div className="flex flex-col items-center gap-4 rounded bg-red-200 p-4 text-red-500">
        <div className="flex flex-row items-center gap-1">
          <img
            src="/icons/error.png"
            alt="에러 아이콘"
            width={24}
            height={24}
          />
          <p className="text-base font-normal">{error.message}</p>
        </div>
        <Button
          onClick={resetBoundary}
          variant="outline"
          size="sm"
          rounded
          className="border-none text-red-500 hover:text-red-600 hover:shadow-md focus:text-red-800"
        >
          다시 시도
        </Button>
      </div>
    </section>
  );
}
