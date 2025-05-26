import { Link } from 'react-router-dom';
import styles from './HeaderNav.module.scss';

interface HeaderNavProps {
  onLinkClick?: () => void;
  className?: string;
  isMobile?: boolean;
}

const HeaderNav = ({ onLinkClick, className = '', isMobile = false }: HeaderNavProps) => (
  <nav className={`${isMobile ? styles.menuModalNav : styles.headerNav} ${className}`}>
    <Link to="/news" onClick={onLinkClick}>
      News
    </Link>
    <Link to="/categories" onClick={onLinkClick}>
      Categories
    </Link>
    <Link to="/new-arrivals" onClick={onLinkClick}>
      New Arrivals
    </Link>
  </nav>
);

export default HeaderNav;
