import type { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  actionLabel: string;
  onAction: () => void;
}

export const Modal = ({ title, children, actionLabel, onAction }: Props) => (
  <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div className="modal-card">
      <h2 id="modal-title">{title}</h2>
      <div>{children}</div>
      <button className="primary-button wide" onClick={onAction}>{actionLabel}</button>
    </div>
  </div>
);
