import styles from './Footer.module.scss';
import LangMenu from '@/components/LangMenu/LangMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright, faRobot } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useRef, useState, Suspense, lazy } from 'react';
import Loader from '@/components/Loader/Loader';
import { useBounceAnimation } from '@/hooks/useBounceAnimation';

const ChatbotModal = lazy(() => import('@/components/ChatbotModal/ChatbotModal'));

const Footer = () => {
  const { t } = useTranslation();
  const robotRef = useRef<HTMLSpanElement>(null);
  const handleMouseLeave = useBounceAnimation(robotRef, styles.bounce);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const handleRobotClick = () => setChatbotOpen(true);
  const handleChatbotClose = () => setChatbotOpen(false);

  return (
    <footer className={styles.footer} role="contentinfo" aria-label={t('footer.regionLabel')}>
      <div className={styles.footer__left}>
        <span className={styles.footer__copyright} aria-label={t('footer.copyrightAria')}>
          <FontAwesomeIcon icon={faCopyright} aria-hidden="true" /> {new Date().getFullYear()}{' '}
          {t('footer.storeName')}
          {t('footer.rights')}
        </span>
      </div>
      <div className={styles.footer__right}>
        <span
          ref={robotRef}
          className={styles.footer__robot}
          tabIndex={0}
          title={t('footer.aiAssistant')}
          onMouseLeave={handleMouseLeave}
          onClick={handleRobotClick}
          role="button"
          aria-label={t('footer.openChatbotAria')}
        >
          <FontAwesomeIcon icon={faRobot} />
        </span>
        <LangMenu aria-label={t('footer.langMenuAria')} />
        {chatbotOpen && (
          <Suspense fallback={<Loader />}>
            <ChatbotModal open={chatbotOpen} onClose={handleChatbotClose} />
          </Suspense>
        )}
      </div>
    </footer>
  );
};

export default Footer;
