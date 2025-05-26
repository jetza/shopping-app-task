import { Link } from 'react-router-dom';
import styles from './HeaderNav.module.scss';

interface HeaderNavProps {
  onLinkClick?: () => void;
  className?: string;
  isModal?: boolean;
}

const HeaderNav = ({ onLinkClick, className = '', isModal = false }: HeaderNavProps) => (
  <nav className={`${isModal ? styles.menuModalNav : styles.headerNav} ${className}`}>
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
