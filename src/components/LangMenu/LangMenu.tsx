import styles from './LangMenu.module.scss';

const LangMenu = () => {
  return (
    <select className={styles.langmenu__lang} aria-label="Language">
      <option value="en">EN</option>
      <option value="sr">SR</option>
    </select>
  );
};

export default LangMenu;
