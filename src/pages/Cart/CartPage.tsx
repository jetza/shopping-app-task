import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from '@/slices/cartSlice';
import Cart from '@/components/Cart/Cart';
import { useCallback } from 'react';

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const increase = useCallback((id: number) => dispatch(increaseQuantity(id)), [dispatch]);
  const decrease = useCallback((id: number) => dispatch(decreaseQuantity(id)), [dispatch]);
  const remove = useCallback((id: number) => dispatch(removeFromCart(id)), [dispatch]);
  const clear = useCallback(() => dispatch(clearCart()), [dispatch]);

  return (
    <Cart
      items={items}
      total={total}
      increaseQuantity={increase}
      decreaseQuantity={decrease}
      removeFromCart={remove}
      clearCart={clear}
    />
  );
};
export default CartPage;
