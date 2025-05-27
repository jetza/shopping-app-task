import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { removeFromCart, clearCart } from '@/slices/cartSlice';
import Cart from '@/components/Cart/Cart';

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const increaseQuantity = (id: number) => dispatch({ type: 'cart/addToCart', payload: { id } });
  const decreaseQuantity = (id: number) =>
    dispatch({ type: 'cart/decreaseQuantity', payload: String(id) });
  const remove = (id: string) => dispatch(removeFromCart(id));
  const clear = () => dispatch(clearCart());

  return (
    <Cart
      items={items}
      total={total}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      removeFromCart={remove}
      clearCart={clear}
    />
  );
};
export default CartPage;
