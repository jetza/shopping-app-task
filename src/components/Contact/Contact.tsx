import { useTranslation } from 'react-i18next';
import styles from './Contact.module.scss';

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.contactTitle}>{t('contact.title')}</h1>
      <div>
        <p>{t('contact.description')}</p>
        <ul className={styles.contactList}>
          <li>
            <strong>{t('contact.emailLabel')}:</strong>{' '}
            <a href="mailto:admin@store.com">admin@store.com</a>
          </li>
          <li>
            <strong>{t('contact.phoneLabel')}:</strong> +381 11 123 4567
          </li>
        </ul>
        <p>{t('contact.formInfo')}</p>
        <form className={styles.contactForm}>
          <label htmlFor="name">{t('contact.name')}</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={styles.contactInput}
            defaultValue="Admin"
          />
          <label htmlFor="email">{t('contact.email')}</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={styles.contactInput}
            defaultValue="admin@store.com"
          />
          <label htmlFor="message">{t('contact.message')}</label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className={styles.contactTextarea}
          />
          <button type="submit" className={styles.contactSubmitBtn}>
            {t('contact.submit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
