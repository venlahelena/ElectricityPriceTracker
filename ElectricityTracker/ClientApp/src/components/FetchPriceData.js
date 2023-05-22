import React, { useEffect, useState } from 'react';
import './FetchPriceData.css';

const FetchPriceData = () => {
    // State variables
    const [price, setPrice] = useState([]); // Holds the price data
    const [cheapestDay, setCheapestDay] = useState(null); // Holds the cheapest day's data
    const [expensiveDay, setExpensiveDay] = useState(null); // Holds the most expensive day's data
    const [loading, setLoading] = useState(true); // Tracks the loading state

    // Fetches and populates the price data
    const populatePriceData = async () => {
        const response = await fetch('electricityprice');
        const data = await response.json();
        setPrice(data);
        setLoading(false);

        // Find cheapest and most expensive days
        const { cheapest, expensive } = findCheapestAndExpensiveDays(data);
        setCheapestDay(cheapest);
        setExpensiveDay(expensive);
    };

    // Finds the cheapest and most expensive days from the price data
    const findCheapestAndExpensiveDays = (data) => {
        let cheapest = null;
        let expensive = null;

        data.forEach((item) => {
            if (!cheapest || item.price < cheapest.price) {
                cheapest = item;
            }

            if (!expensive || item.price > expensive.price) {
                expensive = item;
            }
        });

        return { cheapest, expensive };
    };

    // Fetch and populate the price data on component mount
    useEffect(() => {
        populatePriceData();
    }, []);

    // Formats the date and time string
    const formatDate = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
        };
        return new Date(dateTimeString).toLocaleString(undefined, options);
    };

    // Renders the price table
    const renderPriceTable = () => {
        return (
            <div>
                <div className="price-info">
                    <div className="price-info-item">
                        <strong>Cheapest Day:</strong>{' '}
                        {cheapestDay ? `${formatDate(cheapestDay.dateTime)} - ${cheapestDay.price}` : '-'}
                    </div>
                    <div className="price-info-item">
                        <strong>Most Expensive Day:</strong>{' '}
                        {expensiveDay ? `${formatDate(expensiveDay.dateTime)} - ${expensiveDay.price}` : '-'}
                    </div>
                </div>
                <div className="table-container">
                    <div className="table-wrapper">
                        <table className="table table-striped" aria-labelledby="tableLabel">
                            <thead>
                                <tr>
                                    <th>Date and Time</th>
                                    <th>Price (snt/kWh)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {price.map((item, index) => (
                                    <tr key={index}>
                                        <td>{formatDate(item.dateTime)}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    // Renders the loading message
    const renderLoadingMessage = () => {
        return <p><em>Loading price data...</em></p>;
    };

    // Renders the FetchPriceData component
    return (
        <div>
            <h2 id="tableLabel">Electricity Stock Price from last 7 days</h2>
            <p>
                Here are the displayed electricity stock prices from the past 7 days,
                along with the lowest and highest prices of each day.
            </p>
            {loading ? renderLoadingMessage() : renderPriceTable()}
        </div>
    );
};

export default FetchPriceData;