import styles from './LangMenu.module.scss';

interface LangMenuProps {
  isMobile?: boolean;
}

const LangMenu = ({ isMobile = false }: LangMenuProps) => {
  if (isMobile) return null;
  return (
    <select className={styles.langmenu__lang} aria-label="Language">
      <option value="en">EN</option>
      <option value="sr">SR</option>
    </select>
  );
};

export default LangMenu;
