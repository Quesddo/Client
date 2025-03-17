import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import RefInput from "./Input";

describe("RefInput Component", () => {
  test("기본 렌더링 확인", () => {
    render(<RefInput placeholder="Enter text" />);

    const input = screen.getByPlaceholderText("Enter text");

    expect(input).toBeInTheDocument();
  });

  test("size props에 따라 클래스가 적용되는지 확인", () => {
    render(<RefInput size="lg" placeholder="Large input" />);
    const input = screen.getByPlaceholderText("Large input");

    expect(input).toHaveClass("w-[612px] h-[48px] text-base");
  });

  test("사용자 정의 className이 올바르게 적용되는지 확인", () => {
    render(<RefInput className="custom-class" placeholder="text" />);
    const input = screen.getByPlaceholderText("text");

    expect(input).toHaveClass("custom-class");
  });

  test("placeholder가 올바르게 표시되는지 확인", () => {
    render(<RefInput placeholder="Test Placeholder" />);
    const input = screen.getByPlaceholderText("Test Placeholder");

    expect(input).toBeInTheDocument();
  });

  test("입력값이 정상적으로 반영되는지 확인", () => {
    render(<RefInput />);
    const input = screen.getByRole("textbox");

    // 값 입력
    fireEvent.change(input, { target: { value: "Hello, World!" } });

    expect(input).toHaveValue("Hello, World!");
  });
});
