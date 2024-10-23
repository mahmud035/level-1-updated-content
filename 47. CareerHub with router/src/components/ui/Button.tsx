interface IButtonProps {
  label: string;
  className?: string;
}

export default function Button({ label, className }: IButtonProps) {
  return <button className={`btn-primary ${className}`}>{label}</button>;
}
