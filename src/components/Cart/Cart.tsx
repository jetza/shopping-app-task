import styles from './Cart.module.scss';
import type { CartItem } from '@/slices/cartSlice';

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
  if (items.length === 0)
    return (
      <p className={styles.cartTitle} role="status" aria-live="polite">
        Cart is empty
      </p>
    );

  return (
    <div className={styles.cartContainer} role="region" aria-label="Shopping cart">
      <h2 className={styles.cartTitle} tabIndex={0} aria-label="Your Cart">
        Your Cart
      </h2>
      <ul className={styles.cartList} role="list" aria-label="Cart items">
        {items.map((item) => (
          <li
            key={item.id}
            className={styles.cartItem}
            role="listitem"
            aria-label={`Product: ${item.title}, Quantity: ${item.quantity}, Price: $${item.price}`}
          >
            <img
              src={item.image}
              alt={item.title}
              className={styles.cartItemImage}
              aria-label={item.title}
            />
            <div className={styles.cartItemInfo}>
              <span className={styles.cartItemTitle}>{item.title}</span>
              <span className={styles.cartItemPrice} aria-label={`Price: $${item.price}`}>
                ${item.price}
              </span>
              <span className={styles.cartItemQuantity} aria-label={`Quantity: ${item.quantity}`}>
                Qty: {item.quantity}
              </span>
            </div>
            <div
              className={styles.cartItemActions}
              role="group"
              aria-label={`Actions for ${item.title}`}
            >
              <button
                onClick={() => decreaseQuantity(item.id)}
                aria-label={`Decrease quantity of ${item.title}`}
              >
                -
              </button>
              <button
                onClick={() => increaseQuantity(item.id)}
                aria-label={`Increase quantity of ${item.title}`}
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(String(item.id))}
                aria-label={`Remove ${item.title} from cart`}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3 className={styles.cartTotal} aria-label={`Total price: $${total.toFixed(2)}`}>
        Total: {total.toFixed(2)} $
      </h3>
      <button className={styles.clearCartBtn} onClick={clearCart} aria-label="Clear entire cart">
        Clear cart
      </button>
    </div>
  );
};

export default Cart;
