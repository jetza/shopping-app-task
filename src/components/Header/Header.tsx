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
  faBell,
  faGear,
  faQuestionCircle,
  faBoxOpen,
  faEnvelope,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';
import HeaderNav from '@/components/HeaderNav/HeaderNav';
import Search from '@/components/Search/Search';
import useDevice from '@/contexts/useDevice';
import { logout } from '@/slices/authSlice';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { isMobile } = useDevice();
  const { t } = useTranslation();

  const user = {
    name: 'Jelena Aleksić',
    email: 'jelena@example.com',
    avatar: 'https://avatar.iran.liara.run/public',
    unreadNotifications: 3,
  };

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
        <Search
          isMobile={isMobile}
          onOpenModal={() => {
            if (!isMobile) setSearchModalOpen(true);
            setLogoutModalOpen(false);
          }}
          onFocus={() => setLogoutModalOpen(false)}
        />
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
        {
          <button
            className={styles.userIcon}
            onClick={() => setLogoutModalOpen((open) => !open)}
            aria-label={t('header.openLogoutAria')}
            aria-haspopup="dialog"
            aria-expanded={logoutModalOpen}
          >
            <FontAwesomeIcon icon={faUser} className={styles.icon} aria-hidden="true" />
          </button>
        }
      </div>

      {/* Mobile menu overlay & modal */}
      {menuVisible && (
        <div
          className={
            menuClosing ? `${styles.menuModal} ${styles.menuModalFadeOut}` : styles.menuModal
          }
          role="dialog"
          aria-modal="true"
          aria-label={t('header.menuAria')}
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
                aria-label={t('logoutModal.closeAria')}
                onClick={() => setLogoutModalOpen(false)}
                style={{ background: 'none', border: 'none', boxShadow: 'none', padding: 0 }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <div className={styles.logoutModalContent}>
                <img
                  src={user.avatar}
                  alt={t('header.avatarAlt', { name: user.name })}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    marginBottom: 8,
                    border: '2px solid var(--accent)',
                  }}
                />
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                  <div style={{ fontWeight: 600 }}>{user.name}</div>
                  <div
                    style={{
                      fontSize: '0.97rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {user.email}
                  </div>
                </div>
                <Link
                  to="/profile"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                  }}
                  aria-label={t('header.profileAria')}
                >
                  <FontAwesomeIcon icon={faUserCircle} /> {t('header.profile')}
                </Link>
                <Link
                  to="/settings"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                  }}
                  aria-label={t('header.settingsAria')}
                >
                  <FontAwesomeIcon icon={faGear} /> {t('header.settings')}
                </Link>
                <Link
                  to="/orders"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                  }}
                  aria-label={t('header.ordersAria')}
                >
                  <FontAwesomeIcon icon={faBoxOpen} /> {t('header.orders')}
                </Link>
                <Link
                  to="/notifications"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    position: 'relative',
                  }}
                  aria-label={t('header.notificationsAria')}
                >
                  <FontAwesomeIcon icon={faBell} />
                  {user.unreadNotifications > 0 && (
                    <span
                      style={{
                        background: 'var(--accent)',
                        color: 'var(--badge-text)',
                        borderRadius: '50%',
                        fontSize: 12,
                        minWidth: 18,
                        height: 18,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        left: 22,
                        top: -4,
                        padding: '0 5px',
                      }}
                    >
                      {user.unreadNotifications}
                    </span>
                  )}
                  {t('header.notifications')}
                </Link>
                <Link
                  to="/faq"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                  }}
                  aria-label={t('header.faqAria')}
                >
                  <FontAwesomeIcon icon={faQuestionCircle} /> {t('header.faq')}
                </Link>
                <Link
                  to="/contact"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                  }}
                  aria-label={t('header.contactAria')}
                >
                  <FontAwesomeIcon icon={faEnvelope} /> {t('header.contact')}
                </Link>
                <ThemeSwitcher />
                <button
                  className={styles.logoutModalBtn}
                  onClick={() => {
                    dispatch(logout());
                    setLogoutModalOpen(false);
                    navigate('/login');
                  }}
                >
                  {t('logout')}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.logoutPopover}>
            <div className={styles.logoutPopoverContent}>
              <img
                src={user.avatar}
                alt={t('header.avatarAlt', { name: user.name })}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  marginBottom: 6,
                  border: '2px solid var(--accent)',
                }}
              />
              <div style={{ fontWeight: 600 }}>{user.name}</div>
              <div
                style={{
                  fontSize: '0.97rem',
                  color: 'var(--text-secondary)',
                  marginBottom: 6,
                }}
              >
                {user.email}
              </div>
              <Link
                to="/profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                }}
                aria-label={t('header.profileAria')}
              >
                <FontAwesomeIcon icon={faUserCircle} /> {t('header.profile')}
              </Link>
              <Link
                to="/settings"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                }}
                aria-label={t('header.settingsAria')}
              >
                <FontAwesomeIcon icon={faGear} /> {t('header.settings')}
              </Link>
              <Link
                to="/orders"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                }}
                aria-label={t('header.ordersAria')}
              >
                <FontAwesomeIcon icon={faBoxOpen} /> {t('header.orders')}
              </Link>
              <Link
                to="/notifications"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                  position: 'relative',
                }}
                aria-label={t('header.notificationsAria')}
              >
                <FontAwesomeIcon icon={faBell} />
                {user.unreadNotifications > 0 && (
                  <span
                    style={{
                      background: 'var(--accent)',
                      color: 'var(--badge-text)',
                      borderRadius: '50%',
                      fontSize: 12,
                      minWidth: 18,
                      height: 18,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      left: 22,
                      top: -4,
                      padding: '0 5px',
                    }}
                  >
                    {user.unreadNotifications}
                  </span>
                )}
                {t('header.notifications')}
              </Link>
              <Link
                to="/faq"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                }}
                aria-label={t('header.faqAria')}
              >
                <FontAwesomeIcon icon={faQuestionCircle} /> {t('header.faq')}
              </Link>
              <Link
                to="/contact"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                }}
                aria-label={t('header.contactAria')}
              >
                <FontAwesomeIcon icon={faEnvelope} /> {t('header.contact')}
              </Link>
              <ThemeSwitcher />
              <button
                aria-label={t('logout')}
                type="button"
                className={styles.logoutPopoverBtn}
                onClick={() => {
                  dispatch(logout());
                  setLogoutModalOpen(false);
                  navigate('/login');
                }}
              >
                {t('logout')}
              </button>
            </div>
          </div>
        ))}
    </header>
  );
};

export default Header;
