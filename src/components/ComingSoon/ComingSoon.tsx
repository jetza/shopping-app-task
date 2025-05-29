import styles from './ComingSoon.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  const { t } = useTranslation();
  return (
    <div
      className={styles.comingSoonContainer}
      aria-label={t('comingSoon.regionLabel')}
      role="region"
    >
      <h1 className={styles.comingSoonTitle}>{t('comingSoon.title')}</h1>
      <p className={styles.comingSoonText}>{t('comingSoon.text')}</p>
      <Link to="/products" className={styles.comingSoonBackBtn} aria-label={t('notFound.back')}>
        {t('notFound.back')}
      </Link>
    </div>
  );
};

export default ComingSoon;
