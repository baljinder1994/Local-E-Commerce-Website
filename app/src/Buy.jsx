import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BuyPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        // Add to cart logic
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    return (
        <div className="buy-page">
            <div className="cash-on-delivery-message">
                <p>Cash on Delivery: Your order will be delivered within 3 days. Thank you for shopping with us!</p>
            </div>
            <h1>Buy Products</h1>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={`http://localhost:5000/${product.image.replace(/\\/g, '/')}`} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>${product.price}</p>
                        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
            <Link to="/cart">Go to Cart</Link>
        </div>
    );
};

export default BuyPage;
