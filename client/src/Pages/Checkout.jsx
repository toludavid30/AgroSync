import React from 'react';
import { useCart } from '../Context/CartContext';
import './Checkout.css';

function redirectToPayment(paymentUrl, formData) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = paymentUrl;
  Object.keys(formData).forEach(key => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = formData[key];
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
}

const Checkout = () => {
  const { cart, total, clearCart } = useCart();

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    // For demo, use the first product in cart
    const userEmail = localStorage.getItem('userEmail') || '';
    const payload = {
      listingId: cart[0]._id,
      email: userEmail,
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Payment initiation failed');
      redirectToPayment(data.paymentUrl, data.formData);
      clearCart();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handleCheckout}>
        <h2>Checkout</h2>
        <div className="checkout-summary">
          <ul>
            {cart.map((item) => (
              <li key={item._id}>
                {item.name || item.title} x {item.quantity} = ₦{(item.price * item.quantity).toLocaleString()}
              </li>
            ))}
          </ul>
          <div className="checkout-total">Total: <span className="heroColor">₦{total.toLocaleString()}</span></div>
        </div>
        <button className="heroBG subColor" type="submit" disabled={cart.length === 0}>Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
