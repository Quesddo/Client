import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import TodoChip from "./TodoChip";

describe("TodoChip Component", () => {
  test("기본적으로 'To do' 텍스트가 렌더링되는지 확인", () => {
    render(<TodoChip />);
    const chipElement = screen.getByText("To do");

    expect(chipElement).toBeInTheDocument();
  });

  test("isDone이 true일 때 'Done' 텍스트가 렌더링되는지 확인", () => {
    render(<TodoChip isDone />);
    const chipElement = screen.getByText("Done");

    expect(chipElement).toBeInTheDocument();
  });

  test("isDone이 false일 때 'To do' 텍스트가 렌더링되는지 확인", () => {
    render(<TodoChip isDone={false} />);
    const chipElement = screen.getByText("To do");

    expect(chipElement).toBeInTheDocument();
  });

  test("사용자 정의 className이 올바르게 적용되는지 확인", () => {
    render(<TodoChip className="custom-class" />);
    const chipElement = screen.getByText("To do");

    expect(chipElement).toHaveClass("custom-class");
  });
});
