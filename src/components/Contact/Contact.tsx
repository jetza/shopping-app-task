import { useTranslation } from 'react-i18next';
import styles from './Contact.module.scss';

const EMAIL = 'admin@store.com';
const PHONE = '+381 11 123 4567';

const Contact = () => {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '';
    const mailto = `mailto:${EMAIL}?subject=Contact%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`)}`;
    window.location.href = mailto;
  };

  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.contactTitle}>{t('contact.title')}</h1>
      <div>
        <p>{t('contact.description')}</p>
        <ul className={styles.contactList}>
          <li>
            <strong>{t('contact.emailLabel')}:</strong>{' '}
            <a href={`mailto:${EMAIL}`} className={styles.contactEmailAccent}>
              {EMAIL}
            </a>
          </li>
          <li>
            <strong>{t('contact.phoneLabel')}:</strong> {PHONE}
          </li>
        </ul>
        <p>{t('contact.formInfo')}</p>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
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
            defaultValue={EMAIL}
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
