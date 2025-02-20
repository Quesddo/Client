export default function DeleteIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={"group cursor-pointer"}
    >
      <path
        d="M5.5 5L18.5 18"
        stroke="#64748B"
        strokeWidth="1.8"
        strokeLinecap="round"
        className={"group-hover:stroke-slate-700"}
      />
      <path
        d="M18.5 5L5.5 18"
        stroke="#64748B"
        strokeWidth="1.8"
        strokeLinecap="round"
        className={"group-hover:stroke-slate-700"}
      />
    </svg>
  );
}
