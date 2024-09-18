import React, { useState } from 'react';

const PincodeCheck = () => {
  const [pincode, setPincode] = useState('');
  const [isValid, setIsValid] = useState(null);

  const checkPincode = () => {
    fetch('http://localhost:5000/api/areas/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pincode }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsValid(data.valid);
      });
  };

  return (
    <div>
      <h1>Check if Delivery is Available in Your Area</h1>
      <input
        type="text"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        placeholder="Enter your pincode"
      />
      <button onClick={checkPincode}>Check</button>
      {isValid === null ? null : isValid ? (
        <p>Delivery is available in your area!</p>
      ) : (
        <p>Sorry, we do not deliver to your area.</p>
      )}
    </div>
  );
};

export default PincodeCheck;
