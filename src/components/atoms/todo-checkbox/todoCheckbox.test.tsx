import { fireEvent, render, screen } from "@testing-library/react";

import { TodoCheckbox } from "./TodoCheckbox";

describe("TodoCheckbox", () => {
  test("완료된 경우 active-check 이미지가 표시되어야 함", () => {
    render(<TodoCheckbox done={true} onToggle={jest.fn()} />);

    const checkbox = screen.getByAltText("완료됨"); // 이미지 alt
    expect(checkbox).toHaveAttribute("src", "/active-check.png"); // 이미지 src
  });

  test("미완료된 경우 inactive-check 이미지가 표시되어야 함", () => {
    render(<TodoCheckbox done={false} onToggle={jest.fn()} />);

    const checkbox = screen.getByAltText("미완료");
    expect(checkbox).toHaveAttribute("src", "/inactive-check.png");
  });

  test("버튼 클릭 시 onToggle이 호출되어야 함", () => {
    const mockOnToggle = jest.fn();
    render(<TodoCheckbox done={false} onToggle={mockOnToggle} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });
});
