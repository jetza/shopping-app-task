import { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './ChatbotModal.module.scss';

interface ChatbotModalProps {
  open: boolean;
  onClose: () => void;
}

const ChatbotModal = ({ open, onClose }: ChatbotModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Chatbot"
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close chatbot">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <iframe
          src="https://copilotstudio.microsoft.com/environments/Default-22426826-dc4c-401a-8d0e-7f97e64c0f99/bots/cr3d7_storeQA/webchat?__version__=2"
          style={{ width: '100%', height: '100%' }}
          title="Chatbot"
        />
      </div>
    </div>
  );
};

export default ChatbotModal;
