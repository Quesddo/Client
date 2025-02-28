// format 인자를 넣지 않으면 YYYY. MM. DD 형식이 기본으로 적용
export function formatDate(
  inputDate?: Date | number | string,
  format: string = "YYYY. MM. DD",
): string {
  if (!inputDate) return "";

  let date: Date;

  // 입력이 Date 객체라면 그대로 사용
  if (inputDate instanceof Date) {
    date = inputDate;
  }
  // 입력이 숫자(timestamp)라면 Date 객체로 변환
  else if (typeof inputDate === "number") {
    date = new Date(inputDate);
  }
  // 입력이 문자열이라면 Date 객체로 변환
  else if (typeof inputDate === "string") {
    date = new Date(inputDate);
  } else {
    throw new Error("유효하지 않은 날짜 형식입니다.");
  }

  // 유효한 날짜인지 확인
  if (isNaN(date.getTime())) {
    throw new Error("유효하지 않은 날짜 형식입니다.");
  }

  // 연, 월, 일 가져오기
  const year: string = date.getFullYear().toString();
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const day: string = String(date.getDate()).padStart(2, "0");

  // 포맷에 따라 변환
  return format.replace("YYYY", year).replace("MM", month).replace("DD", day);
}
