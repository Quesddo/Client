import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import ExitBtn from "./ExitBtn";

describe("ExitBtn Component", () => {
  test("이미지가 올바르게 렌더링되는지 확인", () => {
    render(<ExitBtn onClick={jest.fn()} />);

    const button = screen.getByRole("img", { name: /exit-button/i });

    expect(button).toBeInTheDocument();
  });

  test("props로 넘겨준 클래스가 정상적으로 적용되는지 확인", () => {
    render(<ExitBtn onClick={jest.fn()} className="custom-class" />);

    const button = screen.getByRole("img", { name: /exit-button/i });

    expect(button).toHaveClass("custom-class");
  });

  test("클릭 시 onClick 핸들러가 호출되는지 확인", () => {
    const handleClick = jest.fn();
    render(<ExitBtn onClick={handleClick} />);

    const button = screen.getByRole("img", { name: /exit-button/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
