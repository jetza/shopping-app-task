import { useState, useRef, useEffect, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useProductsQuery } from '@/api/useProductsQuery';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/Loader/Loader';

interface SearchProps {
  onCloseModal?: () => void;
  isModalOpen?: boolean;
  onFocus?: () => void;
}

const Search = ({ onCloseModal, isModalOpen, onFocus }: SearchProps) => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [debouncedInput] = useDebounce(input, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: products, isLoading, isError } = useProductsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isModalOpen) {
      inputRef.current?.focus();
    }
  }, [isModalOpen]);

  const filteredProducts = useMemo(() => {
    if (debouncedInput.length < 3) return [];
    return (
      products?.filter((product) =>
        product.title.toLowerCase().includes(debouncedInput.toLowerCase()),
      ) || []
    );
  }, [debouncedInput, products]);

  if (isModalOpen) {
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
          {isLoading && <Loader />}
          {isError && <div className={styles.searchError}>{t('search.error')}</div>}
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

  return null;
};

export default Search;
