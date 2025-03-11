import { NextRouter, useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { useModalContext } from "@/contexts/InputModalContext";

type StopMovePageProps = {
  isPageMoveRestricted: boolean;
};

export const useBlockNavigation = ({
  isPageMoveRestricted,
}: StopMovePageProps) => {
  const router = useRouter();
  const { isPopupOpen, showPopup, hidePopup } = useModalContext();
  const [moveResolveFn, setMoveResolveFn] = useState<
    ((choice: boolean) => void) | null
  >(null);

  const originalPush = router.push;

  const handleConfirmPopup = () => {
    if (moveResolveFn) {
      hidePopup();
      moveResolveFn(true);
    }
  };

  const handleCanclePopup = () => {
    if (moveResolveFn) {
      hidePopup();
      moveResolveFn(false);
    }
  };

  const openModalAndWaitForChoice = () => {
    return new Promise<boolean>((resolve) => {
      showPopup();
      setMoveResolveFn(() => resolve);
    });
  };

  // 뒤로 가기
  const handleBeforePopState = ({ url }: { url: string }) => {
    if (url === router.asPath) {
      return true;
    }
    if (isPageMoveRestricted) {
      openModalAndWaitForChoice().then((result) => {
        if (!result) {
          history.pushState(null, "", router.asPath);
        } else {
          originalPush(url);
        }
      });
      return false; // 이동 차단
    }
    return true; // 이동 허용
  };

  useEffect(() => {
    router.beforePopState(handleBeforePopState);

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);

  // 외부 링크 이동
  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      // 페이지를 벗어나지 않아야 하는 경우
      if (isPageMoveRestricted) {
        e.preventDefault();
        e.returnValue = true; // legacy 브라우저를 위해 추가
      }
    },
    [isPageMoveRestricted],
  );

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  // 내부 링크 이동
  useEffect(() => {
    const newPush: NextRouter["push"] = async (url, as, options) => {
      // 페이지를 벗어나지 않아야 하는 경우
      if (isPageMoveRestricted && !(await openModalAndWaitForChoice())) {
        return false;
      }

      await originalPush(url, as, options);
      return true;
    };
    router.push = newPush;

    return () => {
      router.push = originalPush;
    };
  }, [router, isPageMoveRestricted]);

  return {
    isPopupOpen,
    handleCanclePopup,
    handleConfirmPopup,
  };
};
