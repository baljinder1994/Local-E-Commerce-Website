// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Import a cart icon from react-icons

const Navbar = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Retrieve the cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Set the cart item count
    setCartItemCount(cart.length);
  }, []);

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/buy">Shopping</Link></li>
        
        <li className="cart-icon">
          <Link to="/cart">
            <FaShoppingCart />
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
