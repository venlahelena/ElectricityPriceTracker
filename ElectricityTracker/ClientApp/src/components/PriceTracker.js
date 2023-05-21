import React, { useEffect, useState } from 'react';

const PriceTracker = () => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);

    const populatePriceData = async () => {
        try {
            const response = await fetch('electricityprice');
            const data = await response.json(); // Parse the response as JSON
            setPrices(data);
            setLoading(false);
        } catch (error) {
            console.error('An error occurred while fetching price.', error);
        }
    };

    useEffect(() => {
        populatePriceData();
    }, []);

    const renderPricesTable = (prices) => {
        return (
            <table className='table table-striped' aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Price €</th>
                        <th>Lowest Price €</th>
                        <th>Highest Price €</th>
                    </tr>
                </thead>
                <tbody>
                    {prices.map(item =>
                        <tr key={item.date}>
                            <td>{item.date}</td>
                            <td>{item.price}</td>
                            <td>{item.priceLow}</td>
                            <td>{item.priceHigh}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    let contents = loading
        ? <p><em>Loading...</em></p>
        : renderPricesTable(prices);

    return (
        <div>
            <h1 id="tableLabel">Electricity price</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
};

export default PriceTracker;