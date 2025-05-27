import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './HeaderNav.module.scss';

interface HeaderNavProps {
  onLinkClick?: () => void;
  className?: string;
  isMobile?: boolean;
}

const HeaderNav = ({ onLinkClick, className = '', isMobile = false }: HeaderNavProps) => {
  const { t } = useTranslation();
  return (
    <nav
      className={`${isMobile ? styles.menuModalNav : styles.headerNav} ${className}`}
      aria-label={t('headerNav.regionLabel')}
      role="navigation"
    >
      <Link to="/news" onClick={onLinkClick} aria-label={t('headerNav.newsAria')}>
        {t('headerNav.news')}
      </Link>
      <Link to="/categories" onClick={onLinkClick} aria-label={t('headerNav.categoriesAria')}>
        {t('headerNav.categories')}
      </Link>
      <Link to="/new-arrivals" onClick={onLinkClick} aria-label={t('headerNav.newArrivalsAria')}>
        {t('headerNav.newArrivals')}
      </Link>
    </nav>
  );
};

export default HeaderNav;
