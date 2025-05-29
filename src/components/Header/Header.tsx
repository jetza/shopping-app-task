import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faUser,
  faBars,
  faTimes,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';
import HeaderNav from '@/components/HeaderNav/HeaderNav';
import useDevice from '@/contexts/useDevice';
import UserSettingsModal from '@/components/UserSettingsModal/UserSettingsModal';
import { useTranslation } from 'react-i18next';
import { AVATAR_URL } from '@/constants/urls';
import Search from '@/components/Search/Search';

const Header = () => {
  const location = useLocation();
  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const username = useSelector((state: RootState) => state.auth.username || 'Admin');
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const { isMobile } = useDevice();
  const { t } = useTranslation();

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
          aria-label={t('header.openMenuAria')}
          onClick={() => {
            setMenuOpen(true);
            setLogoutModalOpen(false);
          }}
        >
          <FontAwesomeIcon icon={faBars} size="xs" />
        </button>
        <Link to="/products" className={styles.header__logo} aria-label={t('header.logoAria')}>
          <span className={styles.logoPlaceholder}>{t('header.logo')}</span>
        </Link>
      </div>

      <HeaderNav isMobile={isMobile} className={styles.header__center} />

      <div className={styles.header__right}>
        <button
          className={styles.searchIcon}
          aria-label={t('header.openSearchAria')}
          onClick={() => {
            setSearchModalOpen(true);
            setLogoutModalOpen(false);
          }}
          type="button"
        >
          <FontAwesomeIcon icon={faSearch} className={styles.icon} aria-hidden="true" />
        </button>
        <Link to="/cart" className={styles.cartIcon} aria-label={t('header.cartAria')} role="link">
          <FontAwesomeIcon icon={faShoppingCart} className={styles.icon} aria-hidden="true" />
          {cartItemsCount > 0 && (
            <span
              className={styles.badge}
              aria-label={t('header.cartBadgeAria', { count: cartItemsCount })}
            >
              {cartItemsCount}
            </span>
          )}
        </Link>
        <button
          className={styles.userIcon}
          onClick={() => setLogoutModalOpen((open) => !open)}
          aria-label={t('header.openLogoutAria')}
          aria-haspopup="dialog"
          aria-expanded={logoutModalOpen}
        >
          <FontAwesomeIcon icon={faUser} className={styles.icon} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile menu overlay & modal */}
      {menuVisible && (
        <>
          <div
            className={styles.menuOverlay}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            className={
              menuClosing ? `${styles.menuModal} ${styles.menuModalFadeOut}` : styles.menuModal
            }
            role="dialog"
            aria-modal="true"
            aria-label={t('header.menuAria')}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.menuClose}
              aria-label={t('header.closeMenuAria')}
              onClick={() => setMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} size="sm" aria-hidden="true" />
            </button>
            <HeaderNav isMobile={true} onLinkClick={() => setMenuOpen(false)} />
          </div>
        </>
      )}

      {searchModalOpen && (
        <Search isModalOpen={searchModalOpen} onCloseModal={() => setSearchModalOpen(false)} />
      )}

      {/* User settings modal */}
      <UserSettingsModal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        avatar={AVATAR_URL}
        username={username}
      />
    </header>
  );
};

export default Header;
