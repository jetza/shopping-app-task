import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const location = useLocation();
  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  if (location.pathname === '/login') return null;

  return (
    <header className="header">
      <Link to="/products">Home</Link>

      <Link to="/cart" className="cart-icon">
        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
        {cartItemsCount > 0 && <span className="badge">{cartItemsCount}</span>}
      </Link>
      <Link to="/login" className="user-icon">
        <FontAwesomeIcon icon={faUser} size="lg" />
      </Link>
    </header>
  );
};

export default Header;
