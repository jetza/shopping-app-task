import { useTranslation } from 'react-i18next';
import styles from './LangMenu.module.scss';

const LangMenu = () => {
  const { t, i18n } = useTranslation();
  return (
    <select
      className={styles.langmenu__lang}
      aria-label={t('langMenu.ariaLabel')}
      name="language"
      id="language-select"
      role="listbox"
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
    >
      <option value="en" aria-label={t('langMenu.englishAria')}>
        {t('langMenu.english')}
      </option>
      <option value="sr" aria-label={t('langMenu.serbianAria')}>
        {t('langMenu.serbian')}
      </option>
    </select>
  );
};

export default LangMenu;
