import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { setTheme } from '@/slices/themeSlice';
import styles from './ThemeSwitcher.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.current);

  const handleToggle = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={styles.themeSwitcher} role="group" aria-label="Theme switcher">
      <FontAwesomeIcon
        icon={faSun}
        className={theme === 'light' ? styles.active : ''}
        aria-label="Light theme"
        aria-hidden="false"
      />
      <label className={styles.switch} aria-label="Toggle dark mode">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={handleToggle}
          aria-checked={theme === 'dark'}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          role="switch"
        />
        <span className={styles.slider}></span>
      </label>
      <FontAwesomeIcon
        icon={faMoon}
        className={theme === 'dark' ? styles.active : ''}
        aria-label="Dark theme"
        aria-hidden="false"
      />
    </div>
  );
};

export default ThemeSwitcher;
