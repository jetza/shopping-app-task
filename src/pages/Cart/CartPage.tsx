import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { removeFromCart, clearCart } from '@/slices/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const increaseQuantity = (id: number) => dispatch({ type: 'cart/addToCart', payload: { id } });
  const decreaseQuantity = (id: number) =>
    dispatch({ type: 'cart/decreaseQuantity', payload: String(id) });

  if (items.length === 0) return <p>Korpa je prazna.</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.title} width="50" />
            <strong>{item.title}</strong> – {item.price} x {item.quantity}
            <div>
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
              <button onClick={() => dispatch(removeFromCart(String(item.id)))}>
                Remove from cart
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: {total.toFixed(2)} $</h3>
      <button onClick={() => dispatch(clearCart())}>Clear cart</button>
    </div>
  );
};
export default CartPage;
