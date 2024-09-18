import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const VALID_PINCODES = ['123456', '654321']; // Example pincode areas

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [pincode, setPincode] = useState('');
    const [name, setName] = useState('');
    const [village, setVillage] = useState('');
    const [city, setCity] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [showAddressField, setShowAddressField] = useState(false);
    const [showCashOnDeliveryMessage, setShowCashOnDeliveryMessage] = useState(false);

    useEffect(() => {
        // Retrieve the cart from localStorage
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    const handleRemoveFromCart = (productId) => {
        const updatedCart = cart.filter(product => product._id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
    };

    const handlePincodeChange = (e) => {
        setPincode(e.target.value);
    };

    const handleProceedToAddress = () => {
        if (VALID_PINCODES.includes(pincode)) {
            setShowAddressField(true);
        } else {
            alert('Sorry, we do not deliver to your pincode area.');
        }
    };

    const handleOrder = async () => {
        if (!name.trim() || !village.trim() || !city.trim() || !contactNumber.trim()) {
            alert('Please fill out all address fields.');
            return;
        }

        // Show the Cash on Delivery message
        setShowCashOnDeliveryMessage(true);

        // Proceed with placing the order if user confirms
        const confirmOrder = window.confirm('Cash on Delivery: Your order will be delivered within 3 days. Do you want to proceed?');
        if (!confirmOrder) {
            setShowCashOnDeliveryMessage(false);
            return;
        }

        // Prepare order data
        const orderData = {
            pincode,
            name,
            village,
            city,
            contactNumber,
            cart,
            totalAmount: calculateTotal()
        };

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            // Check if the response is JSON
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                console.log('Response:', result); // Debug: Check response

                if (response.ok) {
                    alert('Thank you for shopping with us! Your order has been placed successfully. Cash on Delivery. You will receive your order in 3 days.');
                    localStorage.removeItem('cart');
                    setCart([]);
                } else {
                    alert(result.message || 'An error occurred while placing the order.');
                }
            } else {
                alert('Unexpected response format.');
            }
        } catch (error) {
            console.error('Error:', error); // Debug: Check error
            alert('An error occurred while placing the order.');
        } finally {
            setShowCashOnDeliveryMessage(false); // Hide message after order process
        }
    };

    const handleAddressInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'village':
                setVillage(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'contactNumber':
                setContactNumber(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className="cart">
            <h1>Your Cart</h1>
            <div className="cart-items">
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cart.map(product => (
                        <div key={product._id} className="cart-item">
                            <img src={`http://localhost:5000/${product.image.replace(/\\/g, '/')}`} alt={product.name} />
                            <div className="cart-item-details">
                                <h2>{product.name}</h2>
                                <p>${product.price}</p>
                                <button onClick={() => handleRemoveFromCart(product._id)}>Remove</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {cart.length > 0 && (
                <>
                    <h2>Total: ${calculateTotal()}</h2>
                    <div className="pincode-section">
                        <input
                            type="text"
                            value={pincode}
                            onChange={handlePincodeChange}
                            placeholder="Enter your pincode"
                        />
                        <button onClick={handleProceedToAddress}>Verify Pincode</button>
                    </div>
                    {VALID_PINCODES.includes(pincode) && !showAddressField && (
                        <div className="address-section">
                            <h3>Enter Your Address</h3>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleAddressInputChange}
                                placeholder="Name"
                            />
                            <input
                                type="text"
                                name="village"
                                value={village}
                                onChange={handleAddressInputChange}
                                placeholder="Village"
                            />
                            <input
                                type="text"
                                name="city"
                                value={city}
                                onChange={handleAddressInputChange}
                                placeholder="City"
                            />
                            <input
                                type="text"
                                name="contactNumber"
                                value={contactNumber}
                                onChange={handleAddressInputChange}
                                placeholder="Contact Number"
                            />
                            <button onClick={handleOrder}>Order</button>
                        </div>
                    )}
                </>
            )}
            <Link to="/buy">Continue Shopping</Link>

            </div>
    );
};

export default Cart;
