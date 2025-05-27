import styles from './NotFound.module.scss';

const NotFound = () => (
  <div className={styles.notFoundContainer} role="main" aria-label="404 Not Found">
    <div
      className={styles.notFoundContent}
      tabIndex={0}
      aria-labelledby="notfound-title"
      aria-describedby="notfound-desc"
    >
      <h1 id="notfound-title" className={styles.notFoundTitle} aria-label="404 error">
        404
      </h1>
      <p id="notfound-desc" className={styles.notFoundText}>
        Oops! Looks like you wandered into the digital jungle.
      </p>
      <div className={styles.notFoundEmoji} aria-hidden="true">
        🌴🦜🦎
      </div>
      <p className={styles.notFoundHint}>
        The page you are looking for does not exist.
        <br />
        <a href="/products" className={styles.notFoundLink} aria-label="Back to home page">
          Back to home
        </a>
      </p>
    </div>
  </div>
);

export default NotFound;
