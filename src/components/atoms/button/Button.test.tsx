import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import Button from "./Button";

describe("Button Component", () => {
  test("버튼이 기본 스타일로 렌더링 되는지 확인", () => {
    render(<Button>버튼</Button>);

    const button = screen.getByRole("button", { name: "버튼" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-blue-500 text-white");
  });

  test("variant props에 따라 스타일이 변경되는지 확인", () => {
    render(<Button variant="outline">버튼</Button>);

    const button = screen.getByRole("button", { name: "버튼" });

    expect(button).toHaveClass("bg-white text-blue-500 border");
  });

  test("size props에 따라 크기가 변경되는지 확인", () => {
    render(<Button size="lg">버튼</Button>);

    const button = screen.getByRole("button", { name: "버튼" });

    expect(button).toHaveClass("w-[291px] h-[48px] text-base");
  });

  test("rounded props가 true일 때, 둥근 스타일이 적용되는지 확인", () => {
    render(<Button rounded={true}>버튼</Button>);

    const button = screen.getByRole("button", { name: "버튼" });

    expect(button).toHaveClass("rounded-[24px]");
  });

  test("disabled 상태일 때 클릭 이벤트가 발생하지 않는지 확인", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        버튼
      </Button>,
    );

    const button = screen.getByRole("button", { name: "버튼" });
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test("버튼 클릭 시 onClick 핸들러가 호출되는지 확인", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>버튼</Button>);

    const button = screen.getByRole("button", { name: "버튼" });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
