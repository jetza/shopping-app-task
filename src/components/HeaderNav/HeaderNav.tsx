import { Link } from 'react-router-dom';
import styles from './HeaderNav.module.scss';

interface HeaderNavProps {
  onLinkClick?: () => void;
  className?: string;
  isMobile?: boolean;
}

const HeaderNav = ({ onLinkClick, className = '', isMobile = false }: HeaderNavProps) => (
  <nav
    className={`${isMobile ? styles.menuModalNav : styles.headerNav} ${className}`}
    aria-label="Main navigation"
    role="navigation"
  >
    <Link to="/news" onClick={onLinkClick} aria-label="Go to news page">
      News
    </Link>
    <Link to="/categories" onClick={onLinkClick} aria-label="Go to categories page">
      Categories
    </Link>
    <Link to="/new-arrivals" onClick={onLinkClick} aria-label="Go to new arrivals page">
      New Arrivals
    </Link>
  </nav>
);

export default HeaderNav;
