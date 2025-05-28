import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faBoxOpen, faQuestionCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import { logout } from '@/slices/authSlice';
import styles from './UserSettingsModal.module.scss';
import { useTranslation } from 'react-i18next';

interface UserSettingsModalProps {
  open: boolean;
  onClose: () => void;
  avatar: string;
  username: string;
}

const UserSettingsModal = ({ open, onClose, avatar, username }: UserSettingsModalProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!open) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.popover} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popoverContent}>
          <img
            src={avatar}
            alt={t('header.avatarAlt', { name: username })}
            className={styles.avatarDesktop}
          />
          <div className={styles.nameDesktop}>{username}</div>
          <Link
            to="/settings"
            className={styles.modalLink}
            aria-label={t('header.settingsAria')}
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faGear} /> {t('header.settings')}
          </Link>
          <Link
            to="/orders"
            className={styles.modalLink}
            aria-label={t('header.ordersAria')}
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faBoxOpen} /> {t('header.orders')}
          </Link>
          <Link
            to="/faq"
            className={styles.modalLink}
            aria-label={t('header.faqAria')}
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faQuestionCircle} /> {t('header.faq')}
          </Link>
          <Link
            to="/contact"
            className={styles.modalLink}
            aria-label={t('header.contactAria')}
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faEnvelope} /> {t('header.contact')}
          </Link>
          <ThemeSwitcher />
          <button
            className={styles.modalBtn}
            onClick={() => {
              dispatch(logout());
              onClose();
              navigate('/login');
            }}
          >
            {t('logout')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsModal;
