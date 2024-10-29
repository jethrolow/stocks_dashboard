import './App.css';
import React from 'react';
import StockForm from './components/StockForm.jsx';
import StockGridDisplay from './components/StockGridDisplay.jsx';
import StockListContext from './contexts/StockListContext';


function App() {
  // define state to store stock data, which should be a list
  const [stockList, setStockList] = React.useState([]);


  return (
    // wrap the StockForm component in the StockListContext.Provider
    <StockListContext.Provider value={{ stockList, setStockList }}>
    <div className = "dashboard-container">
      <h1 className="left-aligned">Finance Dashboard</h1>
      <StockForm />
      <StockGridDisplay />
    </div>
    </StockListContext.Provider>
  )
}

export default App
