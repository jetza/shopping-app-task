import { useTranslation } from 'react-i18next';

import styles from './NotFound.module.scss';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.notFoundContainer} role="main" aria-label="404 Not Found">
      <div
        className={styles.notFoundContent}
        tabIndex={0}
        aria-labelledby="notfound-title"
        aria-describedby="notfound-desc"
      >
        <h1 id="notfound-title" className={styles.notFoundTitle} aria-label="404 error">
          {t('notFound.title')}
        </h1>
        <p id="notfound-desc" className={styles.notFoundText}>
          {t('notFound.text')}
        </p>
        <div className={styles.notFoundEmoji} aria-hidden="true">
          🌴🦜🦎
        </div>
        <p className={styles.notFoundHint}>
          {t('notFound.hint')}
          <br />
          <a href="/products" className={styles.notFoundLink} aria-label={t('notFound.back')}>
            {t('notFound.back')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
