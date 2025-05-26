import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faUser,
  faSearch,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';

const Header = () => {
  const location = useLocation();
  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

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

      <nav className={styles.header__center}>
        <Link to="/news">News</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/new-arrivals">New Arrivals</Link>
      </nav>

      <div className={styles.header__right}>
        <div className={styles.header__search}>
          <input
            type="text"
            placeholder="Search products..."
            className={styles.searchInput}
            aria-label="Search"
          />
          <button
            className={styles.searchIconBtn}
            aria-label="Search"
            onClick={() => {
              if (window.innerWidth <= 768) setSearchModalOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <select className={styles.header__lang} aria-label="Language">
          <option value="en">EN</option>
          <option value="sr">SR</option>
        </select>
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
          <nav className={styles.menuModalNav}>
            <Link to="/news" onClick={() => setMenuOpen(false)}>
              News
            </Link>
            <Link to="/categories" onClick={() => setMenuOpen(false)}>
              Categories
            </Link>
            <Link to="/new-arrivals" onClick={() => setMenuOpen(false)}>
              New Arrivals
            </Link>
          </nav>
        </div>
      )}

      {/* Search modal for mobile */}
      {searchModalOpen && (
        <div
          className={styles.searchModalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSearchModalOpen(false);
          }}
        >
          <div className={styles.searchModalBox}>
            <button
              className={styles.searchModalClose}
              aria-label="Close search modal"
              onClick={() => setSearchModalOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} size="xs" />
            </button>
            <form
              className={styles.searchModalForm}
              role="search"
              aria-label="Site search"
              aria-describedby="search-desc"
              onSubmit={(e) => {
                e.preventDefault();
                setSearchModalOpen(false);
              }}
            >
              <span id="search-desc" className="sr-only">
                Type your search and press submit to find products.
              </span>
              <label htmlFor="search-input" className={styles.searchModalLabel}>
                Search all products
              </label>
              <input
                id="search-input"
                type="text"
                className={styles.searchModalInput}
                placeholder="Type to search..."
                autoComplete="off"
                aria-required="true"
              />
              <button type="submit" className={styles.searchModalSubmit} aria-label="Submit search">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
