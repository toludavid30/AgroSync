import React, { useState, useEffect } from 'react'
import "./styling.css"
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';

const Marketplace = () => {
  const [products, setProducts] = useState([])
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASEURL}/listings`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className='py-3'>
      <h2 className="marketplaceTitle heroColor text-center py-2">Welcome to the AgroSync Marketplace</h2>
      <p className="marketplaceDescription subColor2 text-center fs-5 mx-auto" style={{ maxWidth: '800px' }}>
        Connect with trusted buyers and sellers in our transparent, secure, and efficient platform for trading agricultural produce. Discover a wide range of products, negotiate deals, and grow your agricultural business with AgroSync.
      </p>
      <div className="imageWrap container" style={{height : '60vh'}}>
        <img src="/ChatGPT Image Mar 27, 2026, 05_30_29 PM.png" alt="" className='w-100 h-100' style={{objectFit: "cover"}}/>
      </div>
      <div className="marketplaceGrid container mt-4">
        <h3 className='heroColor'>Fresh Produce</h3>
        <p className='subColor2'>Discover a wide range of fresh agricultural products available for purchase.</p>
        {products.length > 0 ? (
          products.map((product, idx) => (
            <div key={product._id || idx} className="marketplaceCard animated-pop">
              <h3>{product.name || 'Product'}</h3>
              <p>{product.description || 'No description available.'}</p>
              <div className="marketplace-actions">
                <Link to={`/marketplace/${product._id || idx}`} className="marketplace-btn">View</Link>
                <button className="marketplace-btn add-cart-btn" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="marketplaceCard animated-pop text-center py-5">
            <h5 className='heroColor'>No products available</h5>
            <p className='subColor2'>Check back later for new listings!</p>
          </div>
        )}
      </div>
      <Link to="/cart" className="cart-fab">
        <span role="img" aria-label="cart">🛒</span>
      </Link>
    </div>
  )
}

export default Marketplace