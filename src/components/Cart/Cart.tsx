import { useTranslation } from 'react-i18next';
import styles from './Cart.module.scss';
import type { CartItem } from '@/slices/cartSlice';
import Toast from '@/components/Toast/Toast';
import { useState, useEffect, memo } from 'react';
import { convertUsdToRsd } from '@/utils/currency';

interface CartProps {
  items: CartItem[];
  total: number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

type ToastType = 'add' | 'remove' | 'clear' | null;

const Cart = ({
  items,
  total,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
}: CartProps) => {
  const { t, i18n } = useTranslation();
  const [toast, setToast] = useState<ToastType>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (items.length === 0) {
    return (
      <div>
        {toast === 'remove' && <Toast message={t('toast.removedFromCart')} error />}
        {toast === 'clear' && <Toast message={t('toast.cartCleared')} info />}
        <p className={styles.cartTitle} role="status" aria-live="polite">
          {t('cart.empty')}
        </p>
      </div>
    );
  }

  const handleIncrease = (id: number) => {
    increaseQuantity(id);
    setToast('add');
  };

  const handleDecrease = (id: number) => {
    decreaseQuantity(id);
    setToast('remove');
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
    setToast('remove');
  };

  const handleClearCart = () => {
    clearCart();
    setToast('clear');
  };

  return (
    <div className={styles.cartContainer} role="region" aria-label={t('cart.regionLabel')}>
      {toast === 'add' && <Toast message={t('toast.addedToCart')} />}
      {toast === 'remove' && <Toast message={t('toast.removedFromCart')} error />}
      {toast === 'clear' && <Toast message={t('toast.cartCleared')} info />}
      <h2 className={styles.cartTitle} tabIndex={0} aria-label={t('cart.title')}>
        {t('cart.title')}
      </h2>
      <ul className={styles.cartList} role="list" aria-label={t('cart.items')}>
        {items.map((item) => (
          <li
            key={item.id}
            className={styles.cartItem}
            role="listitem"
            aria-label={t('cart.itemLabel', {
              title: item.title,
              quantity: item.quantity,
              price: i18n.language === 'sr' ? convertUsdToRsd(item.price) : item.price,
            })}
          >
            <img
              src={item.image}
              alt={item.title}
              className={styles.cartItemImage}
              aria-label={item.title}
            />
            <div className={styles.cartItemInfo}>
              <span className={styles.cartItemTitle}>{item.title}</span>
              <span
                className={styles.cartItemPrice}
                aria-label={t('cart.price', {
                  price: i18n.language === 'sr' ? convertUsdToRsd(item.price) : item.price,
                })}
              >
                {i18n.language === 'sr'
                  ? `${convertUsdToRsd(item.price)} RSD`
                  : `$${item.price.toFixed(2)} USD`}
              </span>
              <span
                className={styles.cartItemQuantity}
                aria-label={t('cart.quantity', { quantity: item.quantity })}
              >
                {t('cart.quantity', { quantity: item.quantity })}
              </span>
            </div>
            <div
              className={styles.cartItemActions}
              role="group"
              aria-label={t('cart.actions', { title: item.title })}
            >
              <button
                onClick={() => handleDecrease(item.id)}
                aria-label={t('cart.decrease', { title: item.title })}
              >
                -
              </button>
              <button
                onClick={() => handleIncrease(item.id)}
                aria-label={t('cart.increase', { title: item.title })}
              >
                +
              </button>
              <button
                onClick={() => handleRemove(item.id)}
                aria-label={t('cart.remove', { title: item.title })}
              >
                {t('cart.removeBtn')}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3
        className={styles.cartTotal}
        aria-label={t('cart.totalLabel', {
          total: i18n.language === 'sr' ? convertUsdToRsd(total) : total.toFixed(2),
        })}
      >
        {i18n.language === 'sr'
          ? t('cart.total', { total: `${convertUsdToRsd(total)} RSD` })
          : t('cart.total', { total: `$${total.toFixed(2)} USD` })}
      </h3>
      <div className={styles.cartActionsRow}>
        <button
          className={styles.checkoutBtn}
          onClick={() => alert('Checkout!')}
          aria-label={t('cart.checkoutLabel')}
        >
          {t('cart.checkout')}
        </button>
        <button
          className={styles.clearCartBtn}
          onClick={handleClearCart}
          aria-label={t('cart.clearLabel')}
        >
          {t('cart.clear')}
        </button>
      </div>
    </div>
  );
};

export default memo(Cart);
