import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded p-4 space-y-4"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button className="text-sm px-2 py-1 border rounded" onClick={onClose}>
            Close
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}