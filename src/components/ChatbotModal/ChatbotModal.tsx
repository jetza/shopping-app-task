import { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CHATBOT_URL } from '@/constants/urls';
import { useTranslation } from 'react-i18next';
import styles from './ChatbotModal.module.scss';

interface ChatbotModalProps {
  open: boolean;
  onClose: () => void;
}

const ChatbotModal = ({ open, onClose }: ChatbotModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    if (modalRef.current) {
      modalRef.current.focus();
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      style={{ pointerEvents: 'auto' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={styles.modal}
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={t('chatbotAria')}
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label={t('closeChatbotAria')}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <iframe src={CHATBOT_URL} className={styles.chatbotIframe} title={t('chatbotTitle')} />
      </div>
    </div>
  );
};

export default ChatbotModal;
