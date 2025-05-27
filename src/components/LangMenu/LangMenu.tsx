import styles from './LangMenu.module.scss';

const LangMenu = () => {
  return (
    <select
      className={styles.langmenu__lang}
      aria-label="Select language"
      name="language"
      id="language-select"
      role="listbox"
    >
      <option value="en" aria-label="English">
        EN
      </option>
      <option value="sr" aria-label="Serbian">
        SR
      </option>
    </select>
  );
};

export default LangMenu;
