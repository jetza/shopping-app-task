import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

interface SearchProps {
  isMobile?: boolean;
  onOpenModal?: () => void;
  onCloseModal?: () => void;
  isModalOpen?: boolean;
  onFocus?: () => void;
}

const Search = ({
  isMobile = false,
  onOpenModal,
  onCloseModal,
  isModalOpen,
  onFocus,
}: SearchProps) => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isMobile && isModalOpen) {
      inputRef.current?.focus();
    }
  }, [isMobile, isModalOpen]);

  if (isMobile && isModalOpen) {
    return (
      <div
        className={styles.searchModalOverlay}
        onClick={(e) => {
          if (e.target === e.currentTarget && onCloseModal) onCloseModal();
        }}
        role="dialog"
        aria-modal="true"
        aria-label={t('search.modalAria')}
      >
        <div className={styles.searchModalBox}>
          <button
            className={styles.searchModalClose}
            aria-label={t('search.closeAria')}
            onClick={onCloseModal}
          >
            <FontAwesomeIcon icon={faTimes} size="xs" aria-hidden="true" />
          </button>
          <form
            className={styles.searchModalForm}
            role="search"
            aria-label={t('search.formAria')}
            aria-describedby="search-desc"
            onSubmit={(e) => {
              e.preventDefault();
              if (onCloseModal) onCloseModal();
            }}
          >
            <span id="search-desc" className="sr-only">
              {t('search.srHint')}
            </span>
            <label htmlFor="search-input" className={styles.searchModalLabel}>
              {t('search.label')}
            </label>
            <input
              id="search-input"
              type="text"
              className={styles.searchModalInput}
              placeholder={t('search.placeholder')}
              autoComplete="off"
              aria-required="true"
              aria-label={t('search.inputAria')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={onFocus}
              ref={inputRef}
            />
            <button
              type="submit"
              className={styles.searchModalSubmit}
              aria-label={t('search.submitAria')}
            >
              {t('search.submit')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.header__search} role="search" aria-label={t('search.headerAria')}>
      <input
        type="text"
        placeholder={t('search.headerPlaceholder')}
        className={styles.searchInput}
        aria-label={t('search.inputAria')}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={onFocus}
      />
      <button
        className={styles.searchIconBtn}
        aria-label={t('search.openModalAria')}
        onClick={onOpenModal}
      >
        <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
      </button>
    </div>
  );
};

export default Search;
