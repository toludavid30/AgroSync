import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SingleProduct.css';
import { useCart } from '../../Context/CartContext';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BASEURL}/listings${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="single-product-loading">Loading...</div>;
  }
  if (error) {
    return <div className="single-product-error">{error}</div>;
  }
  if (!product) {
    return <div className="single-product-error">Product not found.</div>;
  }

  return (
    <div className="single-product-container animated-fade-in">
      <div className="single-product-card">
        <img
          src={product.imageUrl || '/default-product.jpg'}
          alt={product.title}
          className="single-product-image animated-pop"
        />
        <div className="single-product-details">
          <h2 className="single-product-title">{product.title}</h2>
          <p className="single-product-description">{product.description}</p>
          <div className="single-product-meta">
            <span className="single-product-price">Price: ₦{product.price}</span>
            <span className="single-product-category">Category: {product.category}</span>
          </div>
          <button className="single-product-addcart subBG2 subColor" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
