import "./StockGridDisplay.css";
import React, { useEffect, useState } from 'react';
import StockListContext from '../contexts/StockListContext';

const StockGridDisplay = () => {
    const { stockList, setStockList } = React.useContext(StockListContext);
    const [stockListWithPrices, setStockListWithPrices] = useState([]);

    async function fetchStockPrices(stock) {
        let apiKey = '4I088XUXHM95UTAL';
        const stockSymbol = stock.stockSymbol;
        // apiKey = 'demo';
    
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch stock data: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log("Fetched Data:", data);
    
            // Extract the stock price from the data
            if (data['Global Quote'] && data['Global Quote']['05. price']) {
                const stockPrice = parseFloat(data['Global Quote']['05. price']);
                console.log("Stock Price:", stockPrice);
                return stockPrice;
            } else {
                console.error('Invalid response format:', data);
                return null;
            }
        } catch (error) {
            console.error('Error fetching stock price:', error);
            return null;
        }
    }
    
    // update the stocklist with the latest stock price everytime stockList changes
    useEffect(() => {
        if (stockList.length === 0) return;

        console.log("Fetching latest stock prices...");
    
        // Fetch all stock prices and update stockList immutably
        async function updateStockPrices() {
          const updatedStocks = await Promise.all(
            stockList.map(async (stock) => {
              const stockprice = await fetchStockPrices(stock);
              return { ...stock, price: stockprice };
            })
          );
          setStockListWithPrices(updatedStocks);
          console.log("stockList updated", updatedStocks);
        }
    
        updateStockPrices();
      }, [stockList]);


    function DisplayStockList({stockListWithPrices}) {
        if (stockListWithPrices.length === 0) {
            return <div className="stock-list-item">No stocks added yet.</div>;
        }
        else {
    return stockListWithPrices.map((stock, index) => {
        const priceDifference = stock.price - stock.purchasePrice;
        let priceColor = 'black'; // Default color
        if (priceDifference > 0) {
            priceColor = 'green';
        } else if (priceDifference < 0) {
            priceColor = 'red';
        }
        return (
            
            // a list of the stock symbol, quantity, purchase price, and current price
            <div key={index} className="stock-list-item">
                <div className="stock-list-item-detail">
                    <span className="stock-list-item-label"><strong>Stock Symbol: </strong></span>
                    <span className="stock-list-item-value"><strong>{stock.stockSymbol}</strong></span>
                </div>
                <div className="stock-list-item-detail">
                    <span className="stock-list-item-label">Quantity: </span>
                    <span className="stock-list-item-value">{stock.quantity}</span>
                </div>
                <div className="stock-list-item-detail">
                    <span className="stock-list-item-label">Purchase Price: </span>
                    <span className="stock-list-item-value">{stock.purchasePrice}</span>
                </div>
                <div className="stock-list-item-detail">
                    <span className="stock-list-item-label">Current Price: </span>
                    <span className="stock-list-item-value" 
                    style={{ color: priceColor }}>{stock.price}</span>
                </div>
            </div>
            );
        });
    }
}

    
    return (
        <div>
            <h2 className="left-aligned">Stock List</h2>
            <DisplayStockList stockListWithPrices={stockListWithPrices}/>
        </div>
    );

}

export default StockGridDisplay;