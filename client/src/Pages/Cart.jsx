import React from 'react';
import { useCart } from '../Context/CartContext';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      <div className="cart-card">
        <h2 className="cart-title">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="cart-empty">Your cart is empty.</div>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item._id} className="cart-item">
                  <span className="cart-item-title">{item.name || item.title}</span>
                  <span className="cart-item-meta">₦{item.price} x </span>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                    className="cart-qty-input"
                  />
                  <span className="cart-item-meta"> = ₦{(item.price * item.quantity).toLocaleString()}</span>
                  <button className="cart-remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
                </li>
              ))}
            </ul>
            <div className="cart-total">Total: <span className="heroColor">₦{total.toLocaleString()}</span></div>
            <div className="cart-actions">
              <button className="subBG2 subColor" onClick={clearCart}>Clear Cart</button>
              <button className="heroBG subColor" onClick={handleCheckout}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
