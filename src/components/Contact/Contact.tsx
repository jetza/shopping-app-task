import { useTranslation } from 'react-i18next';
import styles from './Contact.module.scss';
import { z } from 'zod';
import { useState } from 'react';

const EMAIL = 'admin@store.com';
const PHONE = '+381 11 123 4567';

const contactSchema = z.object({
  name: z.string().min(2, 'contact.errorName'),
  email: z.string().email('contact.errorEmail'),
  message: z.string().min(5, 'contact.errorMessage'),
});

const Contact = () => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [formValues, setFormValues] = useState({ name: 'Admin', email: EMAIL, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (name === 'email') {
        const emailValid = z.string().email().safeParse(value).success;
        if (emailValid) {
          delete newErrors.email;
        }
      } else {
        delete newErrors[name as 'name' | 'message'];
      }
      return newErrors;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, message } = formValues;
    const result = contactSchema.safeParse({ name, email, message });
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string; message?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as 'name' | 'email' | 'message'] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
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
        <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">{t('contact.name')}</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={styles.contactInput}
            value={formValues.name}
            onChange={handleChange}
          />
          {errors.name && <span className={styles.error}>{t(errors.name)}</span>}
          <label htmlFor="email">{t('contact.email')}</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={styles.contactInput}
            value={formValues.email}
            onChange={handleChange}
          />
          {errors.email && <span className={styles.error}>{t(errors.email)}</span>}
          <label htmlFor="message">{t('contact.message')}</label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className={styles.contactTextarea}
            value={formValues.message}
            onChange={handleChange}
          />
          {errors.message && <span className={styles.error}>{t(errors.message)}</span>}
          <button type="submit" className={styles.contactSubmitBtn}>
            {t('contact.submit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
