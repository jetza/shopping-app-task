import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useProductsQuery } from '@/hooks/useProductsQuery';
import { useNavigate } from 'react-router-dom';

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
  const { data: products, isLoading, isError } = useProductsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile && isModalOpen) {
      inputRef.current?.focus();
    }
  }, [isMobile, isModalOpen]);

  const filteredProducts =
    input.length >= 3
      ? products?.filter((product) => product.title.toLowerCase().includes(input.toLowerCase())) ||
        []
      : [];

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
          </form>
          {isLoading && <div className={styles.searchLoading}>Loading...</div>}
          {isError && <div className={styles.searchError}>Greška pri učitavanju proizvoda.</div>}
          {/* Prikaz rezultata pretrage */}
          <div className={styles.searchResults}>
            {input && filteredProducts.length === 0 && (
              <div className={styles.noResults}>{t('search.noResults', { query: input })}</div>
            )}
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={styles.searchResultItem}
                tabIndex={0}
                role="button"
                onClick={() => {
                  if (onCloseModal) onCloseModal();
                  navigate(`/products/${product.id}`);
                }}
              >
                <span className={styles.resultTitle}>{product.title}</span>
              </div>
            ))}
          </div>
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
