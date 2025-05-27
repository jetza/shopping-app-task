import styles from './Footer.module.scss';
import LangMenu from '@/components/LangMenu/LangMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Site footer">
      <div className={styles.footer__left}>
        <span className={styles.footer__copyright} aria-label="Copyright">
          <FontAwesomeIcon icon={faCopyright} aria-hidden="true" /> {new Date().getFullYear()}{' '}
          STORE. All rights reserved.
        </span>
      </div>
      <div className={styles.footer__right}>
        <LangMenu aria-label="Language selector" />
      </div>
    </footer>
  );
};

export default Footer;
