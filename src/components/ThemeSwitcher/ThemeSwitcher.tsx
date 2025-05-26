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
    <div className={styles.themeSwitcher}>
      <FontAwesomeIcon icon={faSun} className={theme === 'light' ? styles.active : ''} />
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={handleToggle}
          aria-label="Toggle theme"
        />
        <span className={styles.slider}></span>
      </label>
      <FontAwesomeIcon icon={faMoon} className={theme === 'dark' ? styles.active : ''} />
    </div>
  );
};

export default ThemeSwitcher;
