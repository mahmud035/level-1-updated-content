interface IButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({ label, className, onClick }: IButtonProps) {
  return (
    <button onClick={onClick} className={`btn-primary ${className}`}>
      {label}
    </button>
  );
}
