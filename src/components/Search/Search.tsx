import { useState } from 'react';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

interface SearchProps {
  isMobile?: boolean;
  onOpenModal?: () => void;
  onCloseModal?: () => void;
  isModalOpen?: boolean;
}

const Search = ({ isMobile = false, onOpenModal, onCloseModal, isModalOpen }: SearchProps) => {
  const [input, setInput] = useState('');

  if (isMobile && isModalOpen) {
    return (
      <div
        className={styles.searchModalOverlay}
        onClick={(e) => {
          if (e.target === e.currentTarget && onCloseModal) onCloseModal();
        }}
      >
        <div className={styles.searchModalBox}>
          <button
            className={styles.searchModalClose}
            aria-label="Close search modal"
            onClick={onCloseModal}
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
              if (onCloseModal) onCloseModal();
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className={styles.searchModalSubmit} aria-label="Submit search">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.header__search}>
      <input
        type="text"
        placeholder="Search products..."
        className={styles.searchInput}
        aria-label="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className={styles.searchIconBtn} aria-label="Search" onClick={onOpenModal}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default Search;
