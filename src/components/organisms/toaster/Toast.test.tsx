import { userEvent } from "@storybook/test";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { act, PropsWithChildren, useContext } from "react";

import useToast from "@/hooks/useToast";

import Toaster from "./Toaster";
import ToastProvider, {
  ToastActionContext,
  ToastStateProps,
} from "./ToastProvider";

const ToastDemo = (actionProps: Omit<ToastStateProps, "id" | "state">) => {
  const { addToast } = useToast();

  const handleAddToast = () => {
    addToast(actionProps);
  };

  return (
    <div className="relative flex h-screen">
      <button onClick={handleAddToast}>Toast 추가하기</button>
    </div>
  );
};

const ToastDemoContainer = (
  actionProps: Omit<ToastStateProps, "id" | "state">,
) => {
  return (
    <ToastProvider>
      <ToastDemo {...actionProps} />
      <Toaster />
    </ToastProvider>
  );
};

describe("toast 컴포넌트 테스트", () => {
  test("버튼을 누른 후 toast 컴포넌트 렌더링", async () => {
    const props = {
      content: "toast 입니다.",
    };
    render(<ToastDemoContainer {...props} />);

    expect(() => screen.getByText("toast 입니다.")).toThrow();

    const button = screen.getByRole("button");
    userEvent.click(button);

    expect(await screen.findByText("toast 입니다.")).toBeInTheDocument();
  });

  test("버튼을 누른 후 delay 이후 제거", async () => {
    const props = {
      content: "toast 입니다.",
      delay: 2500,
    };
    render(<ToastDemoContainer {...props} />);

    const button = screen.getByRole("button");
    userEvent.click(button);

    expect(await screen.findByText("toast 입니다.")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(() => screen.getByText("toast 입니다.")).toThrow();
      },
      { timeout: 3000 },
    );
  });

  test("delay가 500ms 이하인 경우 에러 발생", () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <ToastProvider>{children}</ToastProvider>
    );

    const { result } = renderHook(() => useContext(ToastActionContext), {
      wrapper,
    });

    expect(() =>
      act(() => {
        result.current({ content: "에러 테스트", delay: 400 });
      }),
    ).toThrow(`addToast의 delay는 500ms보다 초과되어야 합니다.`);
  });

  test("autoClose가 false인 경우 화면에서 제거되지 않음", async () => {
    const props = {
      content: "toast 입니다.",
      autoClose: false,
    };
    render(<ToastDemoContainer {...props} />);

    expect(() => screen.getByText("toast 입니다.")).toThrow();

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(
      () => {
        expect(screen.getByText("toast 입니다.")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  test("variant가 default일 때 적절한 아이콘 렌더링", async () => {
    const props: Omit<ToastStateProps, "id" | "state"> = {
      content: "toast 입니다.",
      variant: "default",
    };
    render(<ToastDemoContainer {...props} />);

    const button = screen.getByRole("button");
    userEvent.click(button);

    const img = await screen.findByRole("img");
    expect(img.getAttribute("src")).toBe("/icons/check.png");
  });

  test("variant가 error일 때 적절한 아이콘 렌더링", async () => {
    const props: Omit<ToastStateProps, "id" | "state"> = {
      content: "toast 입니다.",
      variant: "error",
    };
    render(<ToastDemoContainer {...props} />);

    const button = screen.getByRole("button");
    userEvent.click(button);

    const img = await screen.findByRole("img");
    expect(img.getAttribute("src")).toBe("/icons/error.png");
  });

  test("content가 ReactElement일 때 정상적으로 렌더링", async () => {
    const props: Omit<ToastStateProps, "id" | "state"> = {
      content: <div>이것은 React Elemment로 넘겨준 토스트 내용입니다.</div>,
      variant: "error",
    };
    render(<ToastDemoContainer {...props} />);

    const button = screen.getByRole("button");
    userEvent.click(button);

    expect(
      await screen.findByText(
        "이것은 React Elemment로 넘겨준 토스트 내용입니다.",
      ),
    ).toBeInTheDocument();
  });
});
