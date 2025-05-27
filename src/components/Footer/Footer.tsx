import styles from './Footer.module.scss';
import LangMenu from '@/components/LangMenu/LangMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
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
        <LangMenu aria-label={t('footer.langMenuAria')} />
      </div>
    </footer>
  );
};

export default Footer;
