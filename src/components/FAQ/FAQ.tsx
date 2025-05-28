import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import styles from './FAQ.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const questions = [
  { q: 'faq.q1', a: 'faq.a1' },
  { q: 'faq.q2', a: 'faq.a2' },
  { q: 'faq.q3', a: 'faq.a3' },
  { q: 'faq.q4', a: 'faq.a4' },
];

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={styles.faqContainer}>
      <h1 className={styles.faqTitle}>{t('faq.title')}</h1>
      <div className={styles.faqContent}>
        {questions.map((item, idx) => (
          <div key={item.q} className={styles.faqAccordionItem}>
            <button
              className={styles.faqAccordionButton}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-panel-${idx}`}
              id={`faq-header-${idx}`}
              onClick={() => handleToggle(idx)}
              type="button"
            >
              <span>{t(item.q)}</span>
              <FontAwesomeIcon
                icon={openIndex === idx ? faMinus : faPlus}
                className={styles.faqAccordionIcon}
              />
            </button>
            <div
              id={`faq-panel-${idx}`}
              role="region"
              aria-labelledby={`faq-header-${idx}`}
              className={styles.faqAccordionPanel}
              style={{ display: openIndex === idx ? 'block' : 'none' }}
            >
              <p className={styles.faqAnswer}>{t(item.a)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
