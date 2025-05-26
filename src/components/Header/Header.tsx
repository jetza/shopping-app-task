import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store/store';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faUser,
  faBars,
  faTimes,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';
import HeaderNav from '@/components/HeaderNav/HeaderNav';
import Search from '@/components/Search/Search';
import { useDevice } from '@/contexts/DeviceContext';
import { logout } from '@/slices/authSlice';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
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
        <Link to="/cart" className={styles.cartIcon}>
          <FontAwesomeIcon icon={faShoppingCart} className={styles.icon} />
          {cartItemsCount > 0 && <span className={styles.badge}>{cartItemsCount}</span>}
        </Link>
        {
          <button
            className={styles.userIcon}
            onClick={() => setLogoutModalOpen((open) => !open)}
            aria-label="Open logout modal"
          >
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
          </button>
        }
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

      {/* Logout modal */}
      {logoutModalOpen &&
        (isMobile ? (
          <div
            className={styles.logoutModalOverlay}
            onClick={(e) => {
              if (e.target === e.currentTarget) setLogoutModalOpen(false);
            }}
          >
            <div className={styles.logoutModalBox}>
              <button
                className={styles.logoutModalClose}
                aria-label="Close logout modal"
                onClick={() => setLogoutModalOpen(false)}
                style={{ background: 'none', border: 'none', boxShadow: 'none', padding: 0 }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <div className={styles.logoutModalContent}>
                <ThemeSwitcher />
                <button
                  className={styles.logoutModalBtn}
                  onClick={() => {
                    dispatch(logout());
                    setLogoutModalOpen(false);
                    navigate('/login');
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.logoutPopover}>
            <div className={styles.logoutPopoverContent}>
              <ThemeSwitcher />
              <button
                className={styles.logoutPopoverBtn}
                onClick={() => {
                  dispatch(logout());
                  setLogoutModalOpen(false);
                  navigate('/login');
                }}
              >
                Logout
              </button>
            </div>
          </div>
        ))}
    </header>
  );
};

export default Header;
