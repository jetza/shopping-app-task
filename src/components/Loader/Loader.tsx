import { useTranslation } from 'react-i18next';

import styles from './Loader.module.scss';

const Loader = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.loaderOverlay} role="status" aria-live="polite">
      <div className={styles.loaderSpinner} aria-label={t('loader.loading')} />
    </div>
  );
};

export default Loader;
