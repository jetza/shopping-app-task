import { useTranslation } from 'react-i18next';
import styles from './Cart.module.scss';
import type { CartItem } from '@/slices/cartSlice';
import Toast from '@/components/Toast/Toast';
import { useState } from 'react';

interface CartProps {
  items: CartItem[];
  total: number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const Cart = ({
  items,
  total,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
}: CartProps) => {
  const { t } = useTranslation();
  const [showNotif, setShowNotif] = useState(false);

  if (items.length === 0)
    return (
      <p className={styles.cartTitle} role="status" aria-live="polite">
        {t('cart.empty')}
      </p>
    );

  const handleIncrease = (id: number) => {
    increaseQuantity(id);
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 2000);
  };

  return (
    <div className={styles.cartContainer} role="region" aria-label={t('cart.regionLabel')}>
      {showNotif ? <Toast message={t('toast.addedToCart')} /> : null}
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
              price: item.price,
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
                aria-label={t('cart.price', { price: item.price })}
              >
                {t('cart.price', { price: item.price })}
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
                onClick={() => decreaseQuantity(item.id)}
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
                onClick={() => removeFromCart(String(item.id))}
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
        aria-label={t('cart.totalLabel', { total: total.toFixed(2) })}
      >
        {t('cart.total', { total: total.toFixed(2) })}
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
          onClick={clearCart}
          aria-label={t('cart.clearLabel')}
        >
          {t('cart.clear')}
        </button>
      </div>
    </div>
  );
};

export default Cart;
