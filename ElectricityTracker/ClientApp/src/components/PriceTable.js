import React from 'react';

const PriceTable = ({ price, cheapestDay, expensiveDay, formatDate }) => {
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

export default PriceTable;