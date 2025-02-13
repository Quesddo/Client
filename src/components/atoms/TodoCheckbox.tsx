interface TodoCheckboxProps {
  done: boolean;
  onToggle: () => void;
}

export function TodoCheckbox({ done, onToggle }: TodoCheckboxProps) {
  return (
    <button
      onClick={onToggle}
      className="flex cursor-pointer items-center p-[3px]"
    >
      <img
        src={done ? "/active-check.png" : "/inactive-check.png"}
        alt={done ? "완료됨" : "미완료"}
        width={18}
        height={18}
        className="rounded-md transition-all duration-150 hover:shadow-sm"
      />
    </button>
  );
}
