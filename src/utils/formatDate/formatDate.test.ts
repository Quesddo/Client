import { formatDate } from "./formatDate";

describe("formatDate 함수 테스트", () => {
  test("ISO 8601 형식의 날짜 문자열을 기본 포맷(YYYY. MM. DD)으로 반환", () => {
    expect(formatDate("2025-04-29T06:15:59.808Z")).toBe("2025. 04. 29");
  });

  test("Date 객체를 입력하면 기본 포맷(YYYY. MM. DD)으로 변환", () => {
    const date = new Date(2025, 3, 29);
    expect(formatDate(date)).toBe("2025. 04. 29");
  });

  test("타임스탬프(ms) 입력 시 기본 포맷(YYYY. MM. DD)으로 변환", () => {
    const timestamp = new Date(2025, 3, 29).getTime();
    expect(formatDate(timestamp)).toBe("2025. 04. 29");
  });

  test("문자열 형식(YYYY-MM-DD)의 날짜를 입력하면 기본 포맷(YYYY. MM. DD)으로 변환", () => {
    expect(formatDate("2025-04-29")).toBe("2025. 04. 29");
  });

  test("MM/DD/YYYY 포맷으로 날짜를 변환", () => {
    const date = new Date(2025, 3, 29);
    expect(formatDate(date, "MM/DD/YYYY")).toBe("04/29/2025");
  });

  test("DD-MM-YYYY 포맷으로 날짜를 변환", () => {
    const date = new Date(2025, 3, 29);
    expect(formatDate(date, "DD-MM-YYYY")).toBe("29-04-2025");
  });

  test("유효하지 않은 날짜 문자열을 입력하면 예외를 발생", () => {
    expect(() => formatDate("invalid-date")).toThrow(
      "유효하지 않은 날짜 형식입니다.",
    );
  });

  test("빈 값 입력 시 빈 문자열 반환", () => {
    expect(formatDate(undefined)).toBe("");
  });

  test("지원되지 않는 타입 입력 시 예외 발생", () => {
    const invalidInputs = [{}, [], true];
    invalidInputs.forEach((input) => {
      expect(() => formatDate(input as never)).toThrow(
        "유효하지 않은 날짜 형식입니다.",
      );
    });
  });

  test("숫자 범위를 초과하는 타임스탬프를 입력하면 예외를 발생", () => {
    expect(() => formatDate(9999999999999999)).toThrow(
      "유효하지 않은 날짜 형식입니다.",
    );
  });
});
