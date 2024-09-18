// HeroSection.js
import React from 'react';

const HeroSection = () => {
  const products = [
    { id: 1, name: 'Laptop 1', image: 'hero.webp', price:'$200' },
    { id: 2, name: 'Laptop 2', image: 'hero.webp',price:'$200' },
    { id: 3, name: 'Laptop 3', image: 'hero.webp',price:'$200' },
    { id: 4, name: 'Laptop 4', image: 'hero.webp',price:'$200' },
    { id: 5, name: 'Laptop 5', image: 'hero.webp',price:'$200' },
    // Add more products as needed
  ];

  
  return (
    <>
    <section className="hero">
      <div className="hero-content">
        <h1 className="highlight">Unleash Your Creativity</h1>
        <p>Discover the power of our latest high-performance laptops. Whether you're working, gaming, or creating, experience unmatched speed and precision.</p>
        <button className="cta-btn">Explore Now</button>
      </div>
      <div className="hero-image">
        <img src="hero.jpg" alt="High-performance Laptop" />
      </div>
    </section>
     <div className="product-page">
     <div className="sidebar">
       <h2>Sale Products</h2>
       <ul className="product-list">
         <li className="product-item">
           <img src="hero.webp" alt="Laptop" />
           <span>Laptop</span>
           <span className="price">$26.99</span>
         </li>
         <li className="product-item">
           <img src="hero.webp" alt="Faded Short" />
           <span>Faded Short</span>
           <span className="price">$16.51</span>
         </li>
         <li className="product-item">
           <img src="hero.webp" alt="Faded Short" />
           <span>Faded Short</span>
           <span className="price">$16.51</span>
         </li>
         <li className="product-item">
           <img src="hero.webp" alt="Faded Short" />
           <span>Faded Short</span>
           <span className="price">$16.51</span>
         </li>
         
         {/* Add more sale items here */}
       </ul>
     </div>

     <div className="main-content">
      

       <div className="product-grid">
         <div className="product-card">
           <img src="hero.webp" alt="Faded Short" />
           <h3>Faded Short</h3>
           <span className="price">$16.51</span>
         </div>
         <div className="product-card">
           <img src="hero.webp" alt="Laptop" />
           <h3>Laptop</h3>
           <span className="price">$26.99</span>
         </div>
         <div className="product-card">
           <img src="hero.webp" alt="Laptop" />
           <h3>Laptop</h3>
           <span className="price">$26.99</span>
         </div>
         
         {/* Add more products here */}
       </div>
       <div className="product-grid">
         <div className="product-card">
           <img src="hero.webp" alt="Faded Short" />
           <h3>Faded Short</h3>
           <span className="price">$16.51</span>
         </div>
         <div className="product-card">
           <img src="hero.webp" alt="Laptop" />
           <h3>Laptop</h3>
           <span className="price">$26.99</span>
         </div>
         <div className="product-card">
           <img src="hero.webp" alt="Laptop" />
           <h3>Laptop</h3>
           <span className="price">$26.99</span>
         </div>
         
         {/* Add more products here */}
       </div>

      
     </div>
     
   </div>
   <section className="fixed-background-section">
      <div className="content">
        <h1>Explore Our Latest Collection</h1>
        <p>Discover the best deals on high-performance laptops. Our collection features the latest models with unbeatable prices and offers.</p>
        <button className="cta-btn">Shop Now</button>
      </div>
    </section>
    <div className="product-slider-container">
      <div className="product-slider">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>Company Name</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>123 Main Street, Anytown, USA</p>
          <p>Email: info@company.com</p>
          <p>Phone: +1 (234) 567-890</p>
        </div>
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Company Name. All rights reserved.</p>
      </div>
    </footer>
   </>
  );
};

export default HeroSection;
