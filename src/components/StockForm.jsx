import "./StockForm.css";
import React, { useState } from 'react';
import StockListContext from '../contexts/StockListContext';

const StockForm = () => {
  const [formData, setFormData] = useState({
    stockSymbol: '',
    quantity: '',
    purchasePrice: '',
  });

  const { stockList, setStockList } = React.useContext(StockListContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    // append to array
    setStockList([...stockList, formData]);
    console.log("stockList", stockList);
  }

  return (
    <form className='stock-form' onSubmit={handleSubmit}>
        <label>
            <input 
            type="text"
            name="stockSymbol"
            value={formData.stockSymbol}
            onChange={handleChange}
            placeholder="Stock Symbol"
            />
        </label>
        <label>
            <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            />
        </label>
        <label>
            <input
            type="number"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            placeholder="Purchase Price"
            />
        </label>
        <button onClick={handleSubmit} type="submit">Add Stock</button>
    </form>
  );
};

export default StockForm;