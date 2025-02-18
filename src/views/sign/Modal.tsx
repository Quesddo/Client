import { useRouter } from "next/router";

export default function Modal() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/login");
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleClick}
      ></div>
      <div className="animate-fadeIn fixed inset-0 flex items-center justify-center">
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <button
            className="absolute top-2 right-4 text-gray-500 hover:text-gray-700"
            onClick={handleClick}
          >
            ✕
          </button>
          <h2 className="my-4 text-center text-base">가입이 완료되었습니다!</h2>
          <button
            className="mt-4 w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
            onClick={handleClick}
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
}
