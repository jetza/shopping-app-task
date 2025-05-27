import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { setTheme } from '@/slices/themeSlice';
import styles from './ThemeSwitcher.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.current);
  const { t } = useTranslation();

  const handleToggle = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={styles.themeSwitcher} role="group" aria-label={t('themeSwitcher.regionLabel')}>
      <FontAwesomeIcon
        icon={faSun}
        className={theme === 'light' ? styles.active : ''}
        aria-label={t('themeSwitcher.light')}
        aria-hidden="false"
      />
      <label className={styles.switch} aria-label={t('themeSwitcher.toggle')}>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={handleToggle}
          aria-checked={theme === 'dark'}
          aria-label={
            theme === 'dark' ? t('themeSwitcher.switchToLight') : t('themeSwitcher.switchToDark')
          }
          role="switch"
        />
        <span className={styles.slider}></span>
      </label>
      <FontAwesomeIcon
        icon={faMoon}
        className={theme === 'dark' ? styles.active : ''}
        aria-label={t('themeSwitcher.dark')}
        aria-hidden="false"
      />
    </div>
  );
};

export default ThemeSwitcher;
