import { fireEvent, render, screen } from "@testing-library/react";

import { TodoCheckbox } from "./TodoCheckbox";

describe("TodoCheckbox", () => {
  test("완료된 경우 active-check 이미지가 표시되어야 함", () => {
    render(<TodoCheckbox checked={true} onToggle={jest.fn()} />);

    const checkbox = screen.getByAltText("체크됨"); // 이미지 alt
    expect(checkbox).toHaveAttribute("src", "/icons/active-check.png"); // 이미지 src
  });

  test("미완료된 경우 inactive-check 이미지가 표시되어야 함", () => {
    render(<TodoCheckbox checked={false} onToggle={jest.fn()} />);

    const checkbox = screen.getByAltText("미체크");
    expect(checkbox).toHaveAttribute("src", "/icons/inactive-check.png");
  });

  test("버튼 클릭 시 onToggle이 호출되어야 함", () => {
    const mockOnToggle = jest.fn();
    render(<TodoCheckbox checked={false} onToggle={mockOnToggle} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });
});
