import React, { useEffect, useRef, ReactNode } from 'react'
import ReactDom from 'react-dom'

interface ModalProps {
  content: ReactNode;
  onClose?: () => void;
}

export default function Modal({ content, onClose }: ModalProps) {
  const portalTarget = typeof window !== 'undefined' ? document.getElementById('portal') : null;
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap and ESC-to-close
  useEffect(() => {
    if (!portalTarget) return;
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    // Focus the first focusable element if it exists
    if (first) {
      first.focus();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (onClose) {
          onClose();
        }
      }
      if (e.key === 'Tab' && focusable && focusable.length > 1) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [portalTarget, onClose]);

  if (!portalTarget) return null;
  return ReactDom.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-none w-auto mx-4 outline-none"
        ref={modalRef}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
      >
        {content}
      </div>
    </div>,
    portalTarget
  );
} 