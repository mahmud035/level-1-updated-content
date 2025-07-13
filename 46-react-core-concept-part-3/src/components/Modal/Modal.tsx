import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface IModalProps {
  children: ReactNode;
}

export default function Modal({ children }: IModalProps) {
  return ReactDOM.createPortal(
    <div className="w-1/3 p-4 mx-auto bg-gray-800 rounded-lg">{children}</div>,
    document.getElementById('modal-root') as HTMLElement
  );
}
