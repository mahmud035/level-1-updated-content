interface IButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: IButtonProps) {
  return (
    <button onClick={onClick} className="btn btn-sm btn-neutral">
      {label}
    </button>
  );
}
