import styles from './Footer.module.scss';
import LangMenu from '@/components/LangMenu/LangMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__left}>
        <span className={styles.footer__copyright}>
          <FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()} STORE. All rights
          reserved.
        </span>
      </div>
      <div className={styles.footer__right}>
        <LangMenu />
      </div>
    </footer>
  );
};

export default Footer;
