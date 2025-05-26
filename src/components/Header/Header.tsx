import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';
import HeaderNav from '@/components/HeaderNav/HeaderNav';
import Search from '@/components/Search/Search';
import { useDevice } from '@/contexts/DeviceContext';
import LangMenu from '@/components/LangMenu/LangMenu';

const Header = () => {
  const location = useLocation();
  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const { isMobile } = useDevice();

  useEffect(() => {
    if (menuOpen) {
      setMenuVisible(true);
      setMenuClosing(false);
    } else if (menuVisible) {
      setMenuClosing(true);
      const timeout = setTimeout(() => {
        setMenuVisible(false);
        setMenuClosing(false);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [menuOpen, menuVisible]);

  if (location.pathname === '/login') return null;

  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <button
          className={styles.hamburger}
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} size="xs" />
        </button>
        <Link to="/products" className={styles.header__logo}>
          <span className={styles.logoPlaceholder}>STORE</span>
        </Link>
      </div>

      <HeaderNav isMobile={isMobile} className={styles.header__center} />

      <div className={styles.header__right}>
        <Search
          isMobile={isMobile}
          onOpenModal={() => {
            if (!isMobile) setSearchModalOpen(true);
          }}
        />
        <LangMenu isMobile={isMobile} />
        <Link to="/cart" className={styles.cartIcon}>
          <FontAwesomeIcon icon={faShoppingCart} className={styles.icon} />
          {cartItemsCount > 0 && <span className={styles.badge}>{cartItemsCount}</span>}
        </Link>
        <Link to="/login" className={styles.userIcon}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
        </Link>
      </div>

      {/* Mobile menu overlay & modal */}
      {menuVisible && (
        <div
          className={
            menuClosing ? `${styles.menuModal} ${styles.menuModalFadeOut}` : styles.menuModal
          }
        >
          <button
            className={styles.menuClose}
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} size="sm" />
          </button>
          <HeaderNav isMobile={true} onLinkClick={() => setMenuOpen(false)} />
        </div>
      )}

      {/* Search modal for mobile */}
      {searchModalOpen && (
        <Search
          isMobile={true}
          isModalOpen={searchModalOpen}
          onCloseModal={() => setSearchModalOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
