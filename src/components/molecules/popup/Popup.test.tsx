import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import Popup from "./Popup";

describe("Popup Component", () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Popup이 정상적으로 렌더링되는지 확인", () => {
    render(
      <Popup onClose={mockOnClose} onConfirm={mockOnConfirm}>
        팝업 내용
      </Popup>,
    );
    const popupContent = screen.getByText("팝업 내용");

    expect(popupContent).toBeInTheDocument();
  });

  test("확인 버튼 클릭 시 onConfirm 핸들러가 호출되는지 확인", () => {
    render(
      <Popup onClose={mockOnClose} onConfirm={mockOnConfirm}>
        팝업 내용
      </Popup>,
    );
    const confirmButton = screen.getByText("확인");

    fireEvent.click(confirmButton);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  test("닫기 버튼(배경 클릭) 시 onClose 핸들러가 호출되는지 확인", () => {
    render(
      <Popup onClose={mockOnClose} onConfirm={mockOnConfirm}>
        팝업 내용
      </Popup>,
    );
    const overlay = screen.getByTestId("popup-overlay");
    fireEvent.click(overlay);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("isCancelEnabled가 true일 때 취소 버튼이 렌더링되는지 확인", () => {
    render(
      <Popup onClose={mockOnClose} onConfirm={mockOnConfirm} isCancelEnabled>
        팝업 내용
      </Popup>,
    );
    const cancelButton = screen.getByText("취소");

    expect(cancelButton).toBeInTheDocument();
  });

  test("isCancelEnabled가 false일 때 취소 버튼이 렌더링되지 않는지 확인", () => {
    render(
      <Popup
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        isCancelEnabled={false}
      >
        팝업 내용
      </Popup>,
    );
    const cancelButton = screen.queryByText("취소");

    expect(cancelButton).not.toBeInTheDocument();
  });

  test("취소 버튼 클릭 시 onClose 핸들러가 호출되는지 확인", () => {
    render(
      <Popup onClose={mockOnClose} onConfirm={mockOnConfirm} isCancelEnabled>
        팝업 내용
      </Popup>,
    );
    const cancelButton = screen.getByText("취소");

    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
