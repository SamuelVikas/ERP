import React from 'react';

const StockErrorPopup = ({ storeName }) => (
  <div className="popup">
    <div className="popup-content">
      <p>Stock level of {storeName} is below 10.</p>
      <button onClick={() => setShowErrorPopup(false)}>Close</button>
    </div>
  </div>
);

export default StockErrorPopup;