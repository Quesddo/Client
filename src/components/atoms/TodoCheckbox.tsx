interface TodoCheckboxProps {
  done: boolean;
  onToggle: () => void;
}

export function TodoCheckbox({ done, onToggle }: TodoCheckboxProps) {
  return (
    <button onClick={onToggle}>
      <img
        src={done ? "/active-check.png" : "/inactive-check.png"}
        alt={done ? "완료됨" : "미완료"}
        width={24}
        height={24}
      />
    </button>
  );
}
