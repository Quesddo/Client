import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import GoalItem from "./GoalItem";

describe("GoalItem Component", () => {
  test("아이콘과 텍스트가 정상적으로 렌더링 되는지 확인", () => {
    render(
      <GoalItem
        goal="목표제목"
        iconSize="sm"
        textSize="base"
        fontWeight="medium"
      />,
    );

    const icon = screen.getByRole("img", { name: "flag-goal" });
    const text = screen.getByText("목표제목");

    expect(icon).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  test("아이콘 크기가 lg일 때 size가 올바르게 렌더링 되는지 확인", () => {
    render(
      <GoalItem
        goal="Big Goal"
        iconSize="lg"
        textSize="lg"
        fontWeight="semibold"
      />,
    );

    const icon = screen.getByRole("img", { name: "flag-goal" });

    expect(icon).toHaveAttribute("width", "40");
    expect(icon).toHaveAttribute("height", "40");
  });

  test("goal 값이 없을 때, span 태그가 렌더링되지 않는지 확인", () => {
    render(<GoalItem iconSize="sm" textSize="base" fontWeight="medium" />);

    const text = screen.queryByText(/.+/); // 아무 텍스트나 있는지 확인

    expect(text).not.toBeInTheDocument();
  });

  test("gap 값이 올바르게 적용되는지 확인", () => {
    const { container } = render(
      <GoalItem
        goal="Gap Test"
        iconSize="sm"
        textSize="sm"
        fontWeight="medium"
        gap={10}
      />,
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveStyle("gap: 10px");
  });
});
