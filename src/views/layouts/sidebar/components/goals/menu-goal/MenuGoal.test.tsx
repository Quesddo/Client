import { userEvent } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { JSX, PropsWithChildren } from "react";

import goalApi from "@/apis/goalApi";
import Toaster from "@/components/organisms/toaster/Toaster";
import ToastProvider from "@/components/organisms/toaster/ToastProvider";
import useToast from "@/hooks/useToast";

import GoalToast from "../GoalToast";
import MenuGoal from "./MenuGoal";

const addToastMock = jest.fn();

jest.mock("@/hooks/useToast", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    addToast: addToastMock,
  })),
}));

jest.mock("@/apis/goalApi", () => ({
  createGoal: jest.fn(),
}));

describe("목표 생성 테스트", () => {
  let queryClient: QueryClient;
  let form: HTMLElement;
  let input: HTMLElement | null;

  let wrapper: ({ children }: PropsWithChildren) => JSX.Element;

  // MenuGoal render 후 새 목표 버튼 클릭
  beforeEach(async () => {
    queryClient = new QueryClient();
    queryClient.invalidateQueries = jest.fn();

    wrapper = ({ children }: PropsWithChildren) => (
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
      </QueryClientProvider>
    );

    render(<MenuGoal />, { wrapper });

    const button = screen.getAllByRole("button", { name: "새 목표" })[0];

    userEvent.click(button);

    form = await screen.findByRole("form");
    input = screen.queryByPlaceholderText("목표를 입력하세요");
  });

  test("input에 값이 없는 경우, 제출 시 입력 폼 제거", async () => {
    fireEvent.submit(form);

    expect(screen.queryByPlaceholderText("목표를 입력하세요")).toBeNull();
  });

  test("input에 공백 값만 있는 경우, 에러 토스트", async () => {
    if (input) {
      fireEvent.change(input, { target: { value: "   " } });
    }

    fireEvent.submit(form);

    const { result } = renderHook(() => useToast());

    await waitFor(() => {
      expect(result.current.addToast).toHaveBeenCalledTimes(1);
      expect(result.current.addToast).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: "error",
          content: "공백만 입력할 수 없습니다",
        }),
      );
    });
  });

  test("input에 값이 있고, 제출 성공 시 성공 토스트 호출 및 쿼리 데이터 무효화", async () => {
    (goalApi.createGoal as jest.Mock).mockResolvedValue({
      id: 1,
      title: "New Goal",
    });

    if (input) {
      fireEvent.change(input, { target: { value: "테스트 작성하기" } });
    }

    fireEvent.submit(form);

    const { result } = renderHook(() => useToast());

    await waitFor(async () => {
      expect(result.current.addToast).toHaveBeenCalledTimes(1);
      expect(result.current.addToast).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.objectContaining({
            type: GoalToast,
            props: expect.objectContaining({
              content: "목표가 추가되었습니다.",
            }),
          }),
        }),
      );

      // 무효화
      expect(queryClient.invalidateQueries).toHaveBeenCalledTimes(1);
    });
  });

  test("input에 값이 있는 경고, 제출 실패 시 실패 토스트 호출", async () => {
    (goalApi.createGoal as jest.Mock).mockRejectedValue(
      new Error("목표 추가 실패"),
    );

    if (input) {
      fireEvent.change(input, { target: { value: "테스트 작성하기" } });
    }

    fireEvent.submit(form);

    const { result } = renderHook(() => useToast());

    await waitFor(() => {
      expect(result.current.addToast).toHaveBeenCalledTimes(1);
      expect(result.current.addToast).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: "error",
          content: <GoalToast content="목표 추가 실패" error />,
        }),
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
