import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import ActionDropdown from "./ActionDropdown";

describe("ActionDropdown Component", () => {
  let mockItems: { label: string; onClick: jest.Mock }[];

  beforeEach(() => {
    mockItems = [
      { label: "Option 1", onClick: jest.fn() },
      { label: "Option 2", onClick: jest.fn() },
    ];
  });

  test("드롭다운이 열려 있을 때 메뉴가 렌더링 되는지 확인", () => {
    render(
      <ActionDropdown items={mockItems} isOpen={true} setIsOpen={jest.fn()} />,
    );

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  test("드롭다운이 닫혀 있을 때 메뉴가 보이지 않는지 확인", () => {
    render(
      <ActionDropdown items={mockItems} isOpen={false} setIsOpen={jest.fn()} />,
    );

    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
  });

  test("메뉴 아이템을 클릭하면 onClick 핸들러가 호출되고 드롭다운이 닫힘", () => {
    const setIsOpenMock = jest.fn(); // 드롭다운 상태를 변경하는 Mock 함수 생성

    render(
      <ActionDropdown
        items={mockItems}
        isOpen={true}
        setIsOpen={setIsOpenMock} // 드롭다운 상태를 변경할 Mock 함수를 props로 전달
      />,
    );

    const option1 = screen.getByText("Option 1");
    fireEvent.click(option1);

    // Option 1의 onClick 핸들러가 정상적으로 실행되었는지 확인
    expect(mockItems[0].onClick).toHaveBeenCalledTimes(1);

    // 클릭 후 드롭다운이 닫혔는지 확인
    expect(setIsOpenMock).toHaveBeenCalledWith(false);
  });

  test("드롭다운 외부 클릭 시 닫힘", () => {
    const setIsOpenMock = jest.fn();
    render(
      <ActionDropdown
        items={mockItems}
        isOpen={true}
        setIsOpen={setIsOpenMock}
      />,
    );

    const overlay = screen.getByTestId("dropdown-overlay");
    fireEvent.click(overlay);

    expect(setIsOpenMock).toHaveBeenCalledWith(false);
  });
});
