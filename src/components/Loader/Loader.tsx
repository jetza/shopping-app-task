import styles from './Loader.module.scss';

const Loader = () => (
  <div className={styles.loaderOverlay} role="status" aria-live="polite">
    <div className={styles.loaderSpinner} aria-label="Loading..." />
  </div>
);

export default Loader;
